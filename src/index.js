const core = require('@actions/core');
const { TwilioClient } = require('./twilio-client');
const client = new TwilioClient(
  core.getInput('twilio_account_sid'),
  core.getInput('twilio_auth_token')
);
(async () => {
  try {
    await client.call(
      core.getInput('voice'),
      core.getInput('text'),
      core.getInput('from'),
      core.getInput('to')
    );
  } catch ({ message }) {
    core.setFailed(message);
  }
})();