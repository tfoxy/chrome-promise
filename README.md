chrome-promise
==========

[![npm version](http://img.shields.io/npm/v/chrome-promise.svg)](https://npmjs.org/package/chrome-promise)
[![build status](https://img.shields.io/travis/tfoxy/chrome-promise.svg)](https://travis-ci.org/tfoxy/chrome-promise)

Chrome API using promises.

*Note: I'm no longer adding features to this library (only bug fixing). You can check other alternative libraries at the end of this file.*


## Installation

Use npm

```sh
npm install chrome-promise
```

Or yarn

```sh
yarn add chrome-promise
```

Or download chrome-promise.js file.

You can include it in your HTML like this:

```html
<script src="chrome-promise.js" data-instance="chromep"></script>
```

Or you can use ES2015 import statement:

```js
import chromep from 'chrome-promise';
```


## Compatibility

It supports Chrome 34 or higher, but it should work in older versions.
Create an issue if it doesn't work for your version.


## Examples

Use local storage.

```js
chromep.storage.local.set({foo: 'bar'}).then(function() {
  alert('foo set');
  return chromep.storage.local.get('foo');
}).then(function(items) {
  alert(JSON.stringify(items)); // => {"foo":"bar"}
});
```

Detect languages of all tabs.

```js
chromep.tabs.query({}).then((tabs) => {
  const promises = tabs.map(tab => chromep.tabs.detectLanguage(tab.id));
  return Promise.all(promises);
}).then((languages) => {
  alert('Languages: ' + languages.join(', '));
}).catch((err) => {
  alert(err.message);
});
```


## Options

If you are testing with node, you can provide a mock for the chrome API
([sinon-chrome](https://github.com/acvetkov/sinon-chrome) is a good choice)
using the constructor.

```js
const ChromePromise = require('chrome-promise/constructor');
const chrome = require('sinon-chrome');

const chromep = new ChromePromise({ chrome });
```

The constructor accepts an options parameter with the following properties:

* `chrome`: the chrome API object. By default (or when null or undefined are used), it is the 'chrome' global property. 

* `Promise`: the object used to create promises. By default, it is the 'Promise' global property.


## Notes

This library is not a replacement of the `chrome` api.
It should be used only for functions that have a callback.

```js
// this returns a rejected promise (because a callback is added to getManifest)
chromep.runtime.getManifest();

// this works
chrome.runtime.getManifest();
```

When there's a callback with multiple parameters,
the promise will return an array with the callback arguments.

```js
chromep.hid.receive(4).then(function(args) {
  const reportId = args[0];
  const data = args[1];
  console.log(reportId, data);
});

// Using babel or chrome >= 49
chromep.hid.receive(4).then(([reportId, data]) => {
  console.log(reportId, data);
});
```

Only APIs that are enabled in the manifest will be available in the `ChromePromise` instance.
If the API is undefined, first check the `permissions` in the `manifest.json` of your project.

```js
// manifest.json
{
  "permissions": [
    "tabs"
  ]
}

// main.js
console.log(typeof chromep.tabs)  // "object"
console.log(typeof chromep.bookmarks)  // "undefined"
```


## Synchronous-looking code

If you are using [babel](https://github.com/babel/babel) or chrome ≥ 55, you can use
[async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
to achieve this.

```js
async function main() {
  await chromep.storage.local.set({foo: 'bar'});
  alert('foo set');
  const items = await chromep.storage.local.get('foo');
  alert(JSON.stringify(items));
}
main();

// try...catch
async function main2() {
  try {
    const tabs = await chromep.tabs.query({});
    const promises = tabs.map(tab => chromep.tabs.detectLanguage(tab.id));
    const languages = await Promise.all(promises);
    alert('Languages: ' + languages.join(', '));
  } catch(err) {
    alert(err);
  }
}
main2();
```

If you are not using babel and you need to support chrome ≥ 39, it can be done with 
[generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).
Using the methods [Q.async](https://github.com/kriskowal/q/wiki/API-Reference#qasyncgeneratorfunction)
and [Q.spawn](https://github.com/kriskowal/q/wiki/API-Reference#qspawngeneratorfunction)
from the [Q library](https://github.com/kriskowal/q), the previous examples can be rewritten as:

```js
Q.spawn(function* () {
  yield chromep.storage.local.set({foo: 'bar'});
  alert('foo set');
  const items = yield chromep.storage.local.get('foo');
  alert(JSON.stringify(items));
});

// try...catch
Q.spawn(function* () {
  try {
    const tabs = yield chromep.tabs.query({});
    const promises = tabs.map(tab => chromep.tabs.detectLanguage(tab.id));
    const languages = yield Promise.all(promises);
    alert('Languages: ' + languages.join(', '));
  } catch(err) {
    alert(err);
  }
});

// promise.catch
Q.async(function* () {
  const tabs = yield chromep.tabs.query({});
  const languages = yield Promise.all(tabs.map((tab) => (
    chromep.tabs.detectLanguage(tab.id);
  )));
  alert('Languages: ' + languages.join(', '));
})().catch(function(err) {
  alert(err);
});

```

You can also use the [co library](https://github.com/tj/co) instead of _Q_.


## Alternative libraries

* [mozilla/webextension-polyfill](https://github.com/mozilla/webextension-polyfill)
* [acvetkov/then-chrome](https://github.com/acvetkov/then-chrome)
* [KeithHenry/chromeExtensionAsync](https://github.com/KeithHenry/chromeExtensionAsync)
