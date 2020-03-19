const core = require('@actions/core');
const client = require('twilio')(
  core.getInput('twilio_account_sid'),
  core.getInput('twilio_auth_token'),
  { lazyLoading: true }
);
const fs = require('fs');
const generateLink = require('./link-generator');

const oldContent = fs.readFileSync('src/voice.xml', 'utf8');
const newContent = oldContent.replace('${text}', core.getInput('text'));

(async () => {
  try {
    const resp = await generateLink(newContent);
    console.log('RESP: ', resp);
    const call = await client.calls.create({
      from: core.getInput('from'),
      to: core.getInput('to'),
      url: resp.body.url
    });
    console.log(call);
  } catch (e) {
    console.log('ERROR: ', e);
    core.setFailed(e.message);
  }
})();
