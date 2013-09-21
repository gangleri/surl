var createError = require('errno').create;
var SUrlError = createError('SUrlError');

module.exports = {
  SUrlError: SUrlError,
  InValidUri: createError('InValidUri', SUrlError)
};
