var extend = require('xtend');
var defaultOptions = {
  alphabet: ('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ').split(''),
  base: 64 
};

module.exports = Bijection;

function Bijection(options) {
  if (!(this instanceof Bijection)) return new Bijection(options);

  this.options = extend(defaultOptions, options);
  if (typeof(this.options.alphabet) === 'string') this.options.alphabet = this.options.alphabet.split('');
  this.options.base = this.options.alphabet.length;
}


Bijection.prototype.encode = function(num) {
  var s = '';
  if (num === 0) return '0';

  while ( num > 0) {
    s += this.options.alphabet[num % this.options.base];
    num = Math.floor(num / this.options.base);
  }

  return s.toString();
}

Bijection.prototype.decode = function(str) {
  var i = 0;
  var _this = this;

  str.split('').forEach(function(c) {
    i = i * _this.options.base + _this.options.alphabet.indexOf(c);
  });

  return i;
}

