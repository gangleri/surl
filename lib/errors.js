var createError = require('errno').create;
var SUrlError = createError('SUrlError');

module.exports = {
  SUrlError: SUrlError,
  InitializationError: createError('InitializationError', SUrlError),
  InValidUri: createError('InValidUri', SUrlError),
  UnknownShortId: createError('UnknownShortId', SUrlError)
};
