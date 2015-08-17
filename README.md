chrome-promise
==========

[![npm version](http://img.shields.io/npm/v/chrome-promise.svg)](https://npmjs.org/package/chrome-promise) ![bower version](https://img.shields.io/bower/v/chrome-promise.svg) [![build status](https://img.shields.io/travis/tfoxy/chrome-promise.svg)](https://travis-ci.org/tfoxy/chrome-promise)

Chrome API using promises.


## Installation

Use npm

```sh
npm install chrome-promise
```

Or bower

```sh
bower install chrome-promise
```

Or download chrome-promise.js file.

You can include it in your HTML like this:

```html
<script type="text/javascript" src="chrome-promise.js"></script>
```


## Example

Detect languages of all tabs.

```js
chrome.promise = new ChromePromise();

chrome.promise.tabs.query({}).then(function(tabs) {
  var promises = tabs.map(function(tab) {
    return chrome.promise.tabs.detectLanguage(tab.id);
  });
  
  return Promise.all(promises);
}).then(function(languages) {
  alert('Languages: ' + languages.join(', '));
}).catch(function(err) {
  alert(err.message);
});
```

Use local storage.

```js
chrome.promise = new ChromePromise();

chrome.promise.storage.local.set({foo: 'bar'}).then(function() {
  alert('foo set');
  return chrome.promise.storage.local.get('foo');
}).then(function(items) {
  alert(JSON.stringify(items)); // => {"foo":"bar"}
});
```


## Options

The constructor accepts two parameters: chrome and Promise.

* `chrome` is the chrome API object. By default (or when null or undefined are used), it is the 'chrome' global property. 

* `Promise` is the object used to create promises. By default, it is the 'Promise' global property.
