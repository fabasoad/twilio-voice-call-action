const core = require('@actions/core');
const client = require('twilio')(
  core.getInput('twilio_account_sid'),
  core.getInput('twilio_auth_token'),
  { lazyLoading: true }
);

const text = core.getInput('text');
const content = `<Response><Say voice="alice">${text}</Say></Response>`;

(async () => {
  try {
    const call = await client.calls.create({
      from: core.getInput('from'),
      to: core.getInput('to'),
      twiml: content
    });
    console.log(call);
  } catch (e) {
    console.log('ERROR: ', e);
    core.setFailed(e.message);
  }
})();
