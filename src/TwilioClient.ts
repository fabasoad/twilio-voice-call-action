import { Twilio } from 'twilio'

class TwilioVoiceNotSupportedException extends Error {
  constructor(voice: string, supportedVoices: string[]) {
    super(`'${voice}' voice is not supported. Possible values: ${supportedVoices.join(', ')}.`);
  }
}

export type TwilioClientProps = {
  accountSid: string,
  authToken: string,
  logLevel: string
}

export class TwilioClient {
  private readonly client: Twilio
  private readonly supportedVoices: string[]

  constructor({ accountSid, authToken, logLevel }: TwilioClientProps) {
    this.client = new Twilio(accountSid, authToken, {
      lazyLoading: true,
      logLevel
    })
    this.supportedVoices = ['man', 'woman', 'alice']
  }

  async call(voice: string, text: string, from: string, to: string): Promise<void> {
    if (this.supportedVoices.includes(voice)) {
      await this.client.calls.create({
        from: from,
        to: to,
        twiml: `<Response><Say voice="${voice}">${text}</Say></Response>`
      });
    } else {
      throw new TwilioVoiceNotSupportedException(voice, this.supportedVoices)
    }
  }
}
