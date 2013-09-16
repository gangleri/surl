var alphabet = ('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ').split(''),
    base = alphabet.length;

module.exports.encode = function(num) {
  var s = '';
  if(num === 0) return '0';

  while( num > 0) {
    s += alphabet[ num % base];
    num = Math.floor(num / base);
  }

  return s.toString();
}

module.exports.decode = function decode(str) {
  var i = 0;
  str.split('').forEach(function(c){
    i = i * base + alphabet.indexOf(c);
  });

  return i;
}

