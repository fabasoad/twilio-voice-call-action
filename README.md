# Twilio voice call action
![](https://img.shields.io/github/v/release/fabasoad/twilio-voice-call-action?include_prereleases) ![YAML Lint](https://github.com/fabasoad/twilio-voice-call-action/workflows/YAML%20Lint/badge.svg)

This action sends Twilio voice call.

## Inputs
1. `twilio_account_sid` - _[Required]_ Twilio account SID. 
2. `twilio_auth_token` - _[Required]_ Twilio auth token.
3. `text` - _[Required]_ Text that will be send by voice call.
4. `from` - _[Required]_ Phone number in your Twilio account to send the voice call from.
5. `to` - _[Required]_ Phone number to send the voice call to.

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
      - uses: fabasoad/twilio-voice-call-action@v1.0.0
        if: success()
        with:
          text: 'Build number ${{ github.run_number }} passed successfully.'
          from: '+1(234)5577991'
          to: '+1(234)3316789'
          twilio_account_sid: ${{ secrets.TWILIO_ACCOUNT_SID }}
          twilio_auth_token: ${{ secrets.TWILIO_ACCOUNT_TOKEN }}
```

### Result
