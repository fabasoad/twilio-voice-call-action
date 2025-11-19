# Twilio voice call action

[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://stand-with-ukraine.pp.ua)
![Releases](https://img.shields.io/github/v/release/fabasoad/twilio-voice-call-action?include_prereleases)
![unit-tests](https://github.com/fabasoad/twilio-voice-call-action/actions/workflows/unit-tests.yml/badge.svg)
![functional-tests](https://github.com/fabasoad/twilio-voice-call-action/actions/workflows/functional-tests.yml/badge.svg)
![security](https://github.com/fabasoad/twilio-voice-call-action/actions/workflows/security.yml/badge.svg)
![linting](https://github.com/fabasoad/twilio-voice-call-action/actions/workflows/linting.yml/badge.svg)
[![codecov](https://codecov.io/gh/fabasoad/twilio-voice-call-action/branch/main/graph/badge.svg?token=50U8UQWIKB)](https://codecov.io/gh/fabasoad/twilio-voice-call-action)

This action sends Twilio voice call.

## Supported OS

<!-- prettier-ignore-start -->
| OS      |                    |
|---------|--------------------|
| Windows | :white_check_mark: |
| Linux   | :white_check_mark: |
| macOS   | :white_check_mark: |
<!-- prettier-ignore-end -->

## Prerequisites

Sign up to [Twilio](https://twilio.com) official web page. Then [register a new
number](https://www.twilio.com/console/voice/numbers) to use it as `from` parameter.
If you use free trial account you have to [add verified phone number](https://support.twilio.com/hc/en-us/articles/223180048-Adding-a-Verified-Phone-Number-or-Caller-ID-with-Twilio)
to use it as `to` parameter. Account SID and Auth token you can find on a [Dashboard
page](https://www.twilio.com/console).

## Inputs

```yaml
- uses: fabasoad/twilio-voice-call-action@v1
  with:
    # (Required) Twilio Account SID.
    twilio-account-sid: "${{ secrets.TWILIO_ACCOUNT_SID }}"
    # (Required) Twilio Auth token.
    twilio-auth-token: "${{ secrets.TWILIO_AUTH_TOKEN }}"
    # (Required) Text that will be sent by voice call.
    text: "GitHub actions build number ${{ github.run_number }} passed successfully."
    # (Required) Phone number in your Twilio account to send the voice call from.
    from: '+1(123)4567890'
    # (Required) Phone number to send the voice call to.
    to: '+1(123)4567809'
    # (Optional) Call voice. Possible values: man, woman, alice. Defaults to "alice".
    voice: "alice"
    # (Optional) Twilio log level. Defaults to "debug".
    twilio-log-level: "debug"
```

## Outputs

None.

## Example phone call

Download [example.mp3](https://raw.githubusercontent.com/fabasoad/twilio-voice-call-action/main/example.mp3)
file to listen.

## Contributions

![Alt](https://repobeats.axiom.co/api/embed/379948bad849c09fd6752bbdcd4aec28c0c25617.svg "Repobeats analytics image")
