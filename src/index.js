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

generateLink(newContent, (voiceUrl) => {
  client.calls
    .create({
      from: core.getInput('from'),
      to: core.getInput('to'),
      url: voiceUrl
    })
    .then(call => {
      console.log('THEN');
      console.log(call);
    })
    .catch(({ message }) => core.setFailed(message));
});
