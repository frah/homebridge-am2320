homebridge-am2320
=================
AM2320 sensor service plugin for Homebridge: https://github.com/nfarina/homebridge

This plugin uses I2C for communicating with AM2320

Installation
------------
1. Install Homebridge using `npm install -g homebridge`
2. Install this plugin `npm install -g homebridge-am2320`
3. Update your configuration file - see below for an example

Configuration
-------------
Example configuration:
```json
{
  "accessories": [
    {
      "accessory": "AM2320",
      "name": "Sensor",
      "options": {
        "address": "0x5c",
        "device": "/dev/i2c-1"
      }
    }
  ]
}
```

