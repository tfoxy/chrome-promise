var ChromePromise = require('./chrome-promise');

var chromep = new ChromePromise();
// Temporary hacky fix to make TypeScript `import` work
chromep.default = chromep;

module.exports = chromep;
