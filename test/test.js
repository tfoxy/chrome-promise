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

    before(function() {
      chrome.promise = new ChromePromise(chrome);
    });

    it('is an object', function() {
      expect(chrome.promise).to.be.an('object');
    });

    it('has the same constants as chrome', function() {
      expect(chrome.promise).to.have.deep.property('runtime.id', chrome.runtime.id);
    });


    describe('tabs.create', function() {

      it('exists', function() {
        expect(chrome.promise).to.have.deep.property('tabs.create');
      });

      it('is a function', function() {
        expect(chrome.promise.tabs.create).to.be.a('function');
      });

      it('returns a promise', function() {
        expect(chrome.promise.tabs.create({})).to.be.an.instanceOf(GLOBAL.Promise);
      });


      describe('promise', function() {
        var promise;
        var tab = {id: 4};
        var options = {windowId: 1};

        before(function() {
          chrome.tabs.create.yields(tab);

          promise = chrome.promise.tabs.create(options);

          return promise;
        });

        it('calls the callback with the same parameters', function() {
          return promise.then(function() {
            //noinspection BadExpressionStatementJS
            expect(chrome.tabs.create.calledWith(options)).to.be.true;
          });
        });

        it('has the same parameter as the callback', function() {
          return expect(promise).to.eventually.equal(tab);
        });

      });

    });

  });
  
});
