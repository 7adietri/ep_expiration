var api = require('ep_etherpad-lite/node/db/API');
var settings = require('ep_etherpad-lite/node/utils/Settings');

var cfg = settings.ep_expiration || {};
var enabled = cfg.enabled !== undefined ? cfg.enabled : true;
var max_days = cfg.max_days !== undefined ? cfg.max_days : 30;

var expirePads = function () {
  if (enabled) {
    api.listAllPads(function (err, data) {
      var max_age = max_days * 86400 * 1000;
      data.padIDs.forEach(function (id) {
        api.getLastEdited(id, function (err, data) {
          if (data) {
            var age = Date.now() - data.lastEdited;
            if (age > max_age) {
              console.log("Pad expired: " + id);
              api.deletePad(id, function () {});
            }
          }
        });
      });
    });
  }
};

exports.expressCreateServer = function (hook_name, args) {
  setInterval(expirePads, 3600 * 1000);
};
