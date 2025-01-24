import run from '../index'
import { TwilioClient } from '../TwilioClient'
import { setFailed } from '@actions/core'

jest.mock('@actions/core', () => {
  return {
    getInput: jest.fn().mockImplementation((name: string) => {
      switch (name) {
        case 'twilio_account_sid': return 'account-sid-test'
        case 'twilio_auth_token': return 'auth-token-test'
        case 'twilio_log_level': return 'log-level-test'
        case 'voice': return 'voice-test'
        case 'text': return 'text-test'
        case 'from': return 'from-test'
        case 'to': return 'to-test'
        default: return ''
      }
    }),
    setFailed: jest.fn().mockImplementation()
  }
})

jest.mock('../TwilioClient', () => {
  return {
    TwilioClient: jest.fn().mockImplementation(() => ({
      call: jest.fn().mockImplementation((voice: string, text: string, from: string, to: string) => {
        expect(voice).toEqual('voice-test')
        expect(text).toEqual('text-test')
        expect(from).toEqual('from-test')
        expect(to).toEqual('to-test')
        return Promise.resolve()
      })
    }))
  }
})

describe('index', () => {

  test('Test successful run', () => {
    // Arrange
    // Act
    run()
    // Assert
    expect(TwilioClient).toHaveBeenCalledWith({
      accountSid: 'account-sid-test',
      authToken: 'auth-token-test',
      logLevel: 'log-level-test'
    })
    expect(setFailed).not.toHaveBeenCalled()
  })
})
