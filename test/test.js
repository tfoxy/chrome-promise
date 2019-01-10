/*!
 * chrome-promise
 * https://github.com/tfoxy/chrome-promise
 *
 * Copyright 2015 Tomás Fox
 * Released under the MIT license
 */

//noinspection BadExpressionStatementJS

var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var chaiJsonSchema = require("chai-json-schema");

chai.use(chaiAsPromised);
chai.use(chaiJsonSchema);
var expect = chai.expect;

var chrome = require('sinon-chrome');
chrome.runtime.id = 'foo123';  // Fix for schema.json

// Some time around Chrome 71, extension.sendRequest (and a few others) started
// throwing an error when accessed.  This mimics that behavior.
Object.defineProperty(chrome.extension, 'sendRequest', { get: function() { throw new Error('Deprecated!'); }}); 

var ChromePromise = require('../constructor');

describe('ChromePromise', function() {
  "use strict";

  it('is a function', function() {
    expect(ChromePromise).to.be.a('function');
  });


  describe('instance', function() {
    var chromep;

    before(function() {
      chromep = new ChromePromise({chrome: chrome});
    });

    it('is an object', function() {
      expect(chromep).to.be.an('object');
    });

    it('has the same schema as chrome', function() {
      expect(chromep).to.have.jsonSchema(require('./schema.json'));
    });

    describe('.tabs.create', function() {
      it('returns a promise', function() {
        expect(chromep.tabs.create({})).to.be.an.instanceOf(Promise);
      });


      describe('promise', function() {
        var promise;
        var tab = {id: 4};
        var options = {windowId: 1};

        before(function() {
          chrome.tabs.create.yields(tab);

          promise = chromep.tabs.create(options);

          return promise;
        });

        it('calls the callback with the same parameters', function() {
          return promise.then(function() {
            expect(chrome.tabs.create.calledWith(options)).to.equal(true);
          });
        });

        it('has the same parameter as the callback', function() {
          return expect(promise).to.eventually.equal(tab);
        });

      });


      describe('multiArgs promise', function() {
        var promise;
        var tab = {id: 4};
        var somethingElse = 2;
        var options = {windowId: 1};

        before(function() {
          chrome.tabs.create.yields(tab, somethingElse);

          promise = chromep.tabs.create(options);

          return promise;
        });

        it('has the parameters of the callback as an array', function() {
          return expect(promise).to.eventually.deep.equal([tab, somethingElse]);
        });

      });

    });

  });
  
});
