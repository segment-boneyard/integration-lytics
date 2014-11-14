
var Test = require('segmentio-integration-tester');
var helpers = require('./helpers');
var facade = require('segmentio-facade');
var assert = require('assert');
var should = require('should');
var Lytics = require('..');

describe('Lytics', function(){
  var settings;
  var lytics;
  var test;

  beforeEach(function(){
    settings = {
      apiKey: 'LPv7adzJu8IhRMTbgWmaagxx',
      cid: 1289
    };
    lytics = new Lytics(settings);
    test = Test(lytics, __dirname);
  });

  it('should have the correct settings', function(){
    test
      .name('Lytics')
      .endpoint('https://c.lytics.io/c')
      .ensure('settings.apiKey')
      .ensure('settings.cid')
      .channels(['server'])
      .retries(2);
  });

  describe('.validate()', function(){
    it('should be invalid if .cid is missing', function(){
      delete settings.cid;
      test.invalid({}, settings);
    });

    it('should be invalid if .apiKey is missing', function(){
      delete settings.apiKey;
      test.invalid({}, settings);
    });

    it('should be valid if settings are complete', function(){
      test.valid({}, settings);
    });
  });

  describe('.track()', function(){
    it('should track successfully', function(done){
      var track = helpers.track();
      var json = track.json();

      json.options = json.options || json.context;
      delete json.context;
      delete json.projectId;

      test
        .set(settings)
        .track(track)
        .query({ access_token: settings.apiKey })
        .sends(json)
        .requests(1)
        .expects(200)
        .end(done);
    });
  });

  describe('.identify()', function(){
    it('should identify successfully', function(done){
      var identify = helpers.identify();
      var json = identify.json();

      json.options = json.options || json.context;
      delete json.context;
      delete json.projectId;

      test
        .set(settings)
        .identify(identify)
        .query({ access_token: settings.apiKey })
        .sends(json)
        .requests(1)
        .expects(200)
        .end(done);
    });
  });

  describe('.alias()', function(){
    it('should alias successfully', function(done){
      var alias = helpers.alias();
      var json = alias.json();

      json.options = json.options || json.context;
      delete json.context;
      delete json.projectId;

      test
        .set(settings)
        .alias(alias)
        .query({ access_token: settings.apiKey })
        .sends(json)
        .requests(1)
        .expects(200)
        .end(done);
    });
  });
});
