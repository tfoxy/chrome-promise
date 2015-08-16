(function() {
  'use strict';

  /* global exports, require */

  var path = require('path');

  exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
      browserName: 'chrome',
      chromeOptions: {
        args: ['--load-extension=' + path.resolve('e2e-app')]
      }
    },
    specs: ['e2e/**/*.js']
  };
})();
