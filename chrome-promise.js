/*!
 * chrome-promise 1.0.7
 * https://github.com/tfoxy/chrome-promise
 *
 * Copyright 2015 Tomás Fox
 * Released under the MIT license
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory.bind(null, typeof exports === 'object' ? this : root));
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(this);
  } else {
    // Browser globals (root is window)
    root.ChromePromise = factory(root);
  }
}(this, function(root) {
  'use strict';

  return ChromePromise;

  ////////////////

  function ChromePromise(chrome, Promise) {
    chrome = chrome || root.chrome;
    Promise = Promise || root.Promise;

    fillProperties(chrome, this);

    ////////////////

    function setPromiseFunction(fn, thisArg) {

      return function() {
        var args = arguments;

        return new Promise(function(resolve, reject) {
          function callback() {
            var err = chrome.runtime.lastError;
            if (err) {
              reject(err);
            } else {
              resolve.apply(null, arguments);
            }
          }

          Array.prototype.push.call(args, callback);

          fn.apply(thisArg, args);
        });

      };

    }

    function fillProperties(source, target) {
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          var val = source[key];
          var type = typeof val;

          if (type === 'object' && !(val instanceof ChromePromise)) {
            target[key] = {};
            fillProperties(val, target[key]);
          } else if (type === 'function') {
            target[key] = setPromiseFunction(val, source);
          } else {
            target[key] = val;
          }
        }
      }
    }
  }
}));
