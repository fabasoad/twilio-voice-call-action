# Twilio voice call action

![Releases](https://img.shields.io/github/v/release/fabasoad/twilio-voice-call-action?include_prereleases)
![Unit Tests](https://github.com/fabasoad/twilio-voice-call-action/workflows/Unit%20Tests/badge.svg)
![Functional Tests](https://github.com/fabasoad/twilio-voice-call-action/workflows/Functional%20Tests/badge.svg)
![Security Tests](https://github.com/fabasoad/twilio-voice-call-action/workflows/Security%20Tests/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/99ae71f3775872bc4338/maintainability)](https://codeclimate.com/github/fabasoad/twilio-voice-call-action/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/99ae71f3775872bc4338/test_coverage)](https://codeclimate.com/github/fabasoad/twilio-voice-call-action/test_coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/fabasoad/twilio-voice-call-action/badge.svg?targetFile=package.json)](https://snyk.io/test/github/fabasoad/twilio-voice-call-action?targetFile=package.json)

This action sends Twilio voice call.

## Prerequisites

Sign up to [Twilio](https://twilio.com) official web page. Then [register a new
number](https://www.twilio.com/console/voice/numbers) to use it as `from` parameter.
If you use free trial account you have to [add verified phone number](https://support.twilio.com/hc/en-us/articles/223180048-Adding-a-Verified-Phone-Number-or-Caller-ID-with-Twilio)
to use it as `to` parameter. Account SID and Auth token you can find on a [Dashboard
page](https://www.twilio.com/console).

## Inputs

| Name               | Required | Description                                                     | Default | Possible values         |
|--------------------|----------|-----------------------------------------------------------------|---------|-------------------------|
| twilio_account_sid | Yes      | Twilio account SID                                              |         | _&lt;String&gt;_        |
| twilio_auth_token  | Yes      | Twilio auth token                                               |         | _&lt;String&gt;_        |
| text               | Yes      | Text that will be send by voice call.                           |         | _&lt;String&gt;_        |
| from               | Yes      | Phone number in your Twilio account to send the voice call from |         | _&lt;String&gt;_        |
| to                 | Yes      | Phone number to send the voice call to                          |         | _&lt;String&gt;_        |
| voice              | No       | Call voice                                                      | `alice` | `man`, `woman`, `alice` |

## Example usage

### Workflow configuration

```yaml
name: Twilio

on: push

jobs:
  twilio-voice-call:
    name: Twilio voice call
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: fabasoad/twilio-voice-call-action@main
        if: success()
        with:
          text: 'GitHub actions build number ${{ github.run_number }} passed successfully.'
          from: '+1(123)4567890'
          to: '+1(123)4567809'
          twilio_account_sid: ${{ secrets.TWILIO_ACCOUNT_SID }}
          twilio_auth_token: ${{ secrets.TWILIO_AUTH_TOKEN }}
```

### Result

Download [example.mp3](https://raw.githubusercontent.com/fabasoad/twilio-voice-call-action/main/example.mp3)
file to listen.
