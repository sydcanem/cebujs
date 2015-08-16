var config;
try {
  config = require('../config');
} catch(e) {
  throw new Error('Could not find site config. Create a config.js in the app root.');
}
module.exports = config;