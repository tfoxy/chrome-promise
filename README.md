chrome-promise
==========

[![npm version](http://img.shields.io/npm/v/chrome-promise.svg)](https://npmjs.org/package/chrome-promise)
[![bower version](https://img.shields.io/bower/v/chrome-promise.svg)](https://github.com/tfoxy/chrome-promise/releases)
[![build status](https://img.shields.io/travis/tfoxy/chrome-promise.svg)](https://travis-ci.org/tfoxy/chrome-promise)

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

Or you can use ES2015 import statement:

```js
import ChromePromise from 'chrome-promise';
```


## Compatibility

It supports Chrome 34 or higher, but it should work in older versions.
Create an issue if it doesn't work for your version.


## Examples

Use local storage.

```js
const chromep = new ChromePromise();

chromep.storage.local.set({foo: 'bar'}).then(function() {
  alert('foo set');
  return chromep.storage.local.get('foo');
}).then(function(items) {
  alert(JSON.stringify(items)); // => {"foo":"bar"}
});
```

Detect languages of all tabs.

```js
const chromep = new ChromePromise();

chromep.tabs.query({}).then((tabs) => {
  let promises = tabs.map(tab => chromep.tabs.detectLanguage(tab.id));
  return Promise.all(promises);
}).then((languages) => {
  alert('Languages: ' + languages.join(', '));
}).catch((err) => {
  alert(err.message);
});
```


## Options

The constructor accepts an options parameter with the following properties:

* `chrome`: the chrome API object. By default (or when null or undefined are used), it is the 'chrome' global property. 

* `Promise`: the object used to create promises. By default, it is the 'Promise' global property.


## Synchronous-looking code

It can be achieved with 
[generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).
Using the methods [Q.async](https://github.com/kriskowal/q/wiki/API-Reference#qasyncgeneratorfunction)
and [Q.spawn](https://github.com/kriskowal/q/wiki/API-Reference#qspawngeneratorfunction)
from the [Q library](https://github.com/kriskowal/q), the previous examples can be rewritten as:

```js
const chromep = new ChromePromise();

Q.spawn(function* () {
  yield chromep.storage.local.set({foo: 'bar'});
  alert('foo set');
  let items = yield chromep.storage.local.get('foo');
  alert(JSON.stringify(items));
});

// try...catch
Q.spawn(function* () {
  try {
    let tabs = yield chromep.tabs.query({});
    let promises = tabs.map(tab => chromep.tabs.detectLanguage(tab.id));
    let languages = yield Promise.all(promises);
    alert('Languages: ' + languages.join(', '));
  } catch(err) {
    alert(err);
  }
});

// promise.catch
Q.async(function* () {
  let tabs = yield chromep.tabs.query({});
  let languages = yield Promise.all(tabs.map((tab) => (
    chromep.tabs.detectLanguage(tab.id);
  )));
  alert('Languages: ' + languages.join(', '));
})().catch(function(err) {
  alert(err);
});

```

You can also use the [co library](https://github.com/tj/co) or async/await instead of _Q_.
