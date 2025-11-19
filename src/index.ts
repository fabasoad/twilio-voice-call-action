import { getInput, setFailed } from '@actions/core'
import { TwilioClient } from './TwilioClient'

export default async function run() {
  const twilioClient = new TwilioClient({
    accountSid: getInput('twilio-account-sid', { required: true, trimWhitespace: true }),
    authToken: getInput('twilio-auth-token', { required: true, trimWhitespace: true }),
    logLevel: getInput('twilio-log-level', { required: false, trimWhitespace: true })
  })
  try {
    await twilioClient.call(
      getInput('voice', { required: false, trimWhitespace: true }),
      getInput('text', { required: true, trimWhitespace: true }),
      getInput('from', { required: true, trimWhitespace: true }),
      getInput('to', { required: true, trimWhitespace: true })
    )
  } catch (e) {
    setFailed((<Error>e).message)
  }
}

run()
