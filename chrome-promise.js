/*!
 * chrome-promise
 * https://github.com/tfoxy/chrome-promise
 *
 * Copyright 2015 Tomás Fox
 * Released under the MIT license
 */

(function(root, factory) {
  if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(this);
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory.bind(null, typeof exports === 'object' ? this : root));
  } else {
    // Browser globals (root is window)
    root.ChromePromise = factory(root);
    var script = document.currentScript;
    if (script) {
      var name = script.dataset.instance;
      if (name) {
        root[name] = new root.ChromePromise();
      }
    }
  }
}(typeof self !== 'undefined' ? self : this, function(root) {
  'use strict';
  var slice = Array.prototype.slice,
      hasOwnProperty = Object.prototype.hasOwnProperty;

  // Temporary hacky fix to make TypeScript `import` work
  ChromePromise.default = ChromePromise;

  return ChromePromise;

  ////////////////

  function ChromePromise(options) {
    options = options || {};
    var chrome = options.chrome || root.chrome;
    var Promise = options.Promise || root.Promise;
    var runtime = chrome.runtime;
    var self = this;
    if (!self) throw new Error('ChromePromise must be called with new keyword');

    fillProperties(chrome, self);

    if (chrome.permissions) {
      chrome.permissions.onAdded.addListener(permissionsAddedListener);
    }

    ////////////////

    function setPromiseFunction(fn, thisArg) {

      return function() {
        var args = slice.call(arguments);

        return new Promise(function(resolve, reject) {
          args.push(callback);

          fn.apply(thisArg, args);

          function callback() {
            var err = runtime.lastError;
            var results = slice.call(arguments);
            if (err) {
              reject(err);
            } else {
              switch (results.length) {
                case 0:
                  resolve();
                  break;
                case 1:
                  resolve(results[0]);
                  break;
                default:
                  resolve(results);
              }
            }
          }
        });

      };

    }

    function fillProperties(source, target) {
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
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

    function permissionsAddedListener(perms) {
      if (perms.permissions && perms.permissions.length) {
        var approvedPerms = {};
        perms.permissions.forEach(function(permission) {
          var api = /^[^.]+/.exec(permission);
          if (api in chrome) {
            approvedPerms[api] = chrome[api];
          }
        });
        fillProperties(approvedPerms, self);
      }
    }
  }
}));
