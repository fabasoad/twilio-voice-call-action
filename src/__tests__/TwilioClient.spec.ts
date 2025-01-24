import { TwilioClient, TwilioVoiceNotSupportedException } from '../TwilioClient'

const twilioFn = jest.fn()
const twilioCallsCreateFn = jest.fn()

jest.mock('twilio', () => ({
  Twilio: jest.fn((...ctrArgs: any[]) => {
    twilioFn(...ctrArgs)
    return {
      calls: {
        create: jest.fn((...createArgs: any[]) =>
          twilioCallsCreateFn(...createArgs)
        )
      }
    }
  })
}))

describe('Twilio Client', () => {
  const expectedAccountSid = 'account-sid-test'
  const expectedAuthToken = 'auth-token-test'
  const expectedLogLevel = 'log-level-test'
  const expectedText = 'text-test'
  const expectedFrom = 'from-test'
  const expectedTo = 'to-test'

  describe('Positive scenarios', () => {
    test.each(['man', 'woman', 'alice'])('when %s voice is set then should pass', async (expectedVoice: string) => {
      // Act
      const twilioClient = new TwilioClient({ accountSid: expectedAccountSid, authToken: expectedAuthToken, logLevel: expectedLogLevel })
      await twilioClient.call(expectedVoice, expectedText, expectedFrom, expectedTo)
      // Assert
      expect(twilioFn).toHaveBeenCalledWith(
        expectedAccountSid, expectedAuthToken, { lazyLoading: true, logLevel: expectedLogLevel }
      )
      expect(twilioCallsCreateFn).toHaveBeenCalledWith({
        from: expectedFrom,
        to: expectedTo,
        twiml: `<Response><Say voice="${expectedVoice}">${expectedText}</Say></Response>`
      })
    })
  })

  describe('Negative scenarios', () => {
    test('when unsupported voice is set then should throw error', async () => {
      // Act
      const twilioClient = new TwilioClient({ accountSid: expectedAccountSid, authToken: expectedAuthToken, logLevel: expectedLogLevel })
      const fnCall = () => twilioClient.call(
        'unsupported', expectedText, expectedFrom, expectedTo
      )
      // Assert
      expect(twilioFn).toHaveBeenCalledWith(
        expectedAccountSid, expectedAuthToken, { lazyLoading: true, logLevel: expectedLogLevel }
      )
      await expect(fnCall).rejects.toThrow(TwilioVoiceNotSupportedException)
    })
  })
})
