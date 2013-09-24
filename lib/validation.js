var URL = require('url');

module.exports.isValidUrl = function(str) {
  if (typeof str !== 'string') return false;

  var url = URL.parse(str);

  if(typeof url !== 'object' || !url.host) return false;

  return true;
}
