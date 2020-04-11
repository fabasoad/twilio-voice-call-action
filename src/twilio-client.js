class TwilioClientException extends Error {
  constructor(message) {
    super(message);
  }
}

class TwilioClient {
  constructor(sid, token, twilioRetriever = (s, t) => require('twilio')(s, t, { lazyLoading: true })) {
    this.client = twilioRetriever(sid, token);
    this.SUPPORTED_VOICES = ['man', 'woman', 'alice'];
  }

  async call(voice, text, from, to) {
    if (this.SUPPORTED_VOICES.includes(voice)) {
      await this.client.calls.create({
        from: from,
        to: to,
        twiml: `<Response><Say voice="${voice}">${text}</Say></Response>`
      });
    } else {
      throw new TwilioClientException(`'${voice}' voice is not supported. Possible values: man, woman, alice.`);
    }
  }
}

module.exports = { TwilioClient, TwilioClientException };