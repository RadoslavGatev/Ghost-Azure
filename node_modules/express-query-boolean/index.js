var parseBool = require('./lib/parse');

module.exports = function() {
  return function(req, res, next) {
    req.query = parseBool(req.query);
    next();
  };
};
