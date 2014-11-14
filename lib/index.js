
/**
 * Module dependencies.
 */

var integration = require('segmentio-integration');
var fmt = require('util').format;

/**
 * Expose `Lytics`
 */

var Lytics = module.exports = integration('Lytics')
  .endpoint('https://c.lytics.io/c')
  .ensure('settings.apiKey')
  .ensure('settings.cid')
  .channels(['server'])
  .retries(2);

/**
 * Methods
 */

Lytics.prototype.identify = request;
Lytics.prototype.track = request;
Lytics.prototype.alias = request;

/**
 * Request.
 *
 * http://admin.lytics.io/doc/#segmentio
 *
 * @param {Facade} message
 * @param {Fucntion} fn
 */

function request(message, fn){
  var json = message.json();
  json.options = json.options || json.context;
  delete json.context;
  delete json.projectId;
  return this
    .post(fmt('/%s/segmentio', this.settings.cid))
    .query({ access_token: this.settings.apiKey })
    .type('json')
    .send(json)
    .end(this.handle(fn));
}
