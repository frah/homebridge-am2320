var AM2320 = require('am2320');
var Service, Characteristic;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory("homebridge-am2320", "AM2320", AM2320Plugin);
}

function AM2320Plugin(log, config) {
  this.log = log;
  this.name = config.name;
  this.options = config.options || {};

  var address = config.options.address || 0x5c;
  var device = config.options.device || '/dev/i2c-1';

  this.sensor = new AM2320(address, device);

  this.temperatureService = new Service.TemperatureSensor(this.name);
  this.temperatureService
    .getCharacteristic(Characteristic.CurrentTemperature)
    .on('get', this.getCurrentTemperature.bind(this));
  this.humidityService = new Service.HumiditySensor(this.name);
  this.humidityService
    .getCharacteristic(Characteristic.CurrentRelativeHumidity)
    .on('get', this.getCurrentRelativeHumidity.bind(this));
}

AM2320Plugin.prototype.getCurrentTemperature = function(callback) {
  var self = this;
  this.sensor.readTemperature()
    .then(function(data) {
      callback(null, data);
    })
    .catch(function(err) {
      self.log("AM2320 read error");
      callback(err);
    });
}

AM2320Plugin.prototype.getCurrentRelativeHumidity = function(callback) {
  var self = this;
  this.sensor.readHumidity()
    .then(function(data) {
      callback(null, data);
    })
    .catch(function(err) {
      self.log("AM2320 read error");
      callback(err);
    });
}

AM2320Plugin.prototype.getServices = function() {
  return [this.temperatureService, this.humidityService];
}

