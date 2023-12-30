const assert = require('assert');
const itParam = require('mocha-param');
const { TwilioClient, TwilioClientException } = require('../src/twilio-client');
const twilioMockFactory = require('./twilio-mock');

const voices = ['man', 'woman', 'alice'];

describe('Test Twilio call', () => {
  itParam('should make call by ${value} voice', voices, async (voice) => {
    const sid = '6Bz&8UVj2w3X6l';
    const token = 'x&7eUZptk@J9vt';
    const logLevel = 'debug';
    const text = 'eT#uL&8z%exXj5';
    const from = '*46&Mii8neNhAy';
    const to = 'Y$6L0$kJToePD#';

    const twilioRetriever = (s, t, l) => {
      assert.equal(sid, s);
      assert.equal(token, t);
      assert.equal(logLevel, l);

      return twilioMockFactory(voice, text, from, to);
    };

    const client = new TwilioClient(sid, token, logLevel, twilioRetriever);
    await client.call(voice, text, from, to);
  });

  it('should not make call with invalid voice', async () => {
    const voice = '@tPkTT3n1^JG1x';
    const sid = '6Bz&8UVj2w3X6l';
    const token = 'x&7eUZptk@J9vt';
    const logLevel = 'debug';
    const text = 'eT#uL&8z%exXj5';
    const from = '*46&Mii8neNhAy';
    const to = 'Y$6L0$kJToePD#';

    const twilioRetriever = (s, t, l) => {
      assert.equal(sid, s);
      assert.equal(token, t);
      assert.equal(logLevel, l);

      return {
        calls: {
          create: () => new Promise((res) => res())
        }
      };
    };

    const client = new TwilioClient(sid, token, logLevel, twilioRetriever);
    try {
      await client.call(voice, text, from, to);
    } catch (e) {
      if (e instanceof TwilioClientException) {
        return;
      }
    }
    assert.throw(() => {});
  });
});
