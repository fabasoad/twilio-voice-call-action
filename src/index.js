const core = require('@actions/core');
const client = require('twilio')(
  core.getInput('twilio_account_sid'),
  core.getInput('twilio_auth_token'),
  { lazyLoading: true }
);
const fs = require('fs');

const VOICE_FILE = 'src/voice.generated.xml';

async function run() {
  const oldContent = fs.readFileSync('src/voice.xml', { encoding: 'utf8' });
  process.stdout.write(oldContent);
  const newContent = oldContent.replace('${text}', core.getInput('text'));
  await fs.writeFile(VOICE_FILE, newContent);

  await client.calls
    .create({
      from: core.getInput('from'),
      to: core.getInput('to'),
      url: VOICE_FILE
    })
    .then(call => process.stdout.write(call));
}

run();
