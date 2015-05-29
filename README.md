chrome-promise
==========

Chrome API using promises.


## Installation

Use npm

```sh
npm install chrome-promise
```

Or download chrome-promise.js file.

You can include it in your HTML like this:

```html
<script type="text/javascript" src="chrome-promise.js"></script>
<script type="text/javascript">
  chrome.promise = new ChromePromise();
</script>
```


## Example

Remove all inactive tabs from the last focused window.

```js
chrome.promise = new ChromePromise();

chrome.promise.tabs.query({
  active: false,
  lastFocusedWindow: true
}).then(function(tabs) {
  return tabs.map(function(tab) {
    return chrome.promise.tabs.remove(tab.id);
  });
}).then(function() {
  alert('All inactive tabs were removed successfully');
}).catch(function(err) {
  alert(err.message);
});
```


## Options

The constructor accepts two parameters: chrome and Promise.

* `chrome` is the chrome API object. By default (or when null or undefined are used), it is the 'chrome' global property. 

* `Promise` is the object used to create promises. By default, it is the 'Promise' global property.
