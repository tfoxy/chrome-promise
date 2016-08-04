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

chai.use(chaiAsPromised);
var expect = chai.expect;

var chrome = require('sinon-chrome');
var ChromePromise = require('..');

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

    it('has the same constants as chrome', function() {
      expect(chromep).to.have.deep.property('runtime.id', chrome.runtime.id);
    });


    describe('.tabs', function() {

      it('exists', function() {
        expect(chromep).to.have.property('tabs');
      });

      it('is an object', function() {
        expect(chromep.tabs).to.be.an('object');
      });

    });


    describe('.tabs.create', function() {

      it('exists', function() {
        expect(chromep).to.have.deep.property('tabs.create');
      });

      it('is a function', function() {
        expect(chromep.tabs.create).to.be.a('function');
      });

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
