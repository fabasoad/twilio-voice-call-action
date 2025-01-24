import { getInput, setFailed } from '@actions/core'
import { TwilioClient } from './TwilioClient'

export default async function run() {
  const twilioClient = new TwilioClient({
    accountSid: getInput('twilio_account_sid'),
    authToken: getInput('twilio_auth_token'),
    logLevel: getInput('twilio_log_level')
  })
  try {
    await twilioClient.call(
      getInput('voice'),
      getInput('text'),
      getInput('from'),
      getInput('to')
    )
  } catch (e) {
    setFailed((<Error>e).message)
  }
}

run()
