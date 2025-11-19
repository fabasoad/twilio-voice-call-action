const setFailedFn = jest.fn()
const twilioClientCallFn = jest.fn()

import run from '../index'
import { TwilioClient } from '../TwilioClient'

jest.mock('@actions/core', () => ({
  getInput: jest.fn((name: string) => {
    switch (name) {
      case 'twilio-account-sid': return 'account-sid-test'
      case 'twilio-auth-token': return 'auth-token-test'
      case 'twilio-log-level': return 'log-level-test'
      case 'voice': return 'voice-test'
      case 'text': return 'text-test'
      case 'from': return 'from-test'
      case 'to': return 'to-test'
      default: return ''
    }
  }),
  setFailed: jest.fn((message: string) => setFailedFn(message))
}))

jest.mock('../TwilioClient', () => ({
  TwilioClient: jest.fn(() => ({
    call: jest.fn((voice: string, text: string, from: string, to: string) =>
      twilioClientCallFn(voice, text, from, to)
    )
  }))
}))

describe('Main entrypoint', () => {
  describe('Positive scenarios', () => {
    test('when all set then should not fail', () => {
      // Arrange
      twilioClientCallFn.mockImplementation(
        (voice: string, text: string, from: string, to: string) => {
          expect(voice).toEqual('voice-test')
          expect(text).toEqual('text-test')
          expect(from).toEqual('from-test')
          expect(to).toEqual('to-test')
          return Promise.resolve()
        }
      )
      // Act
      run()
      // Assert
      expect(TwilioClient).toHaveBeenCalledWith({
        accountSid: 'account-sid-test',
        authToken: 'auth-token-test',
        logLevel: 'log-level-test'
      })
      expect(setFailedFn).not.toHaveBeenCalled()
    })
  })

  describe('Negative scenarios', () => {
    test('when Twilio client throws error then should fail the CI', () => {
      // Arrange
      const expectedErrorMessage = 'error-test'
      twilioClientCallFn.mockImplementation(() => {
        throw new Error(expectedErrorMessage)
      })
      // Act
      run()
      // Assert
      expect(TwilioClient).toHaveBeenCalledWith({
        accountSid: 'account-sid-test',
        authToken: 'auth-token-test',
        logLevel: 'log-level-test'
      })
      expect(setFailedFn).toHaveBeenCalledWith(expectedErrorMessage)
    })
  })

  afterEach(() => {
    setFailedFn.mockClear()
    twilioClientCallFn.mockClear()
  })
})
