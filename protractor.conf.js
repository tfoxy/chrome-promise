(function() {
  'use strict';

  /* global exports, require, process */

  var path = require('path');

  var config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
      browserName: 'chrome',
      chromeOptions: {
        args: ['--load-extension=' + path.resolve('e2e-app')]
      }
    },
    specs: ['e2e/**/*.js']
  };

  if (process.env.TRAVIS) {
    config.capabilities.chromeOptions.args.push('--no-sandbox');
  }

  exports.config = config;
})();
