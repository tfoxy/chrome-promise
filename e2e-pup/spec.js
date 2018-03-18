const path = require('path');
const fs = require('fs');
const { expect } = require('chai');
const puppeteer = require('puppeteer');

describe('chrome extension page', () => {
  let browser, page;

  before(async () => {
    const pathToExtension = path.resolve(__dirname, '..', 'e2e-app');
    browser = await puppeteer.launch({
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    page = await browser.newPage();
  });

  beforeEach(async () => {
    await page.goto('chrome-extension://oaeciicibcdolnheomcfodedafhmgkee/empty.html');
  });

  after(async () => {
    if (browser) {
      await browser.close();
    }
  });

  it('has a chrome object', async () => {
    expect(await page.evaluate('typeof chrome')).to.equals('object');
  });

  describe('with ChromePromise', () => {
    const chromePromiseScript = fs.readFileSync('chrome-promise.js', {
      encoding: 'utf8'
    });

    beforeEach(async () => {
      await page.evaluate(chromePromiseScript);
    });

    afterEach(async () => {
      await page.evaluate(() => {
        chrome.storage.local.clear();
      });
    });

    it('sets and gets some value using chrome.storage', async () => {
      function script() {
        const chromep = new ChromePromise();

        return chromep.storage.local.set({foo: 'bar'}).then(() => {
          return chromep.storage.local.get('foo');
        });
      }

      expect(await page.evaluate(script)).to.deep.equal({foo: 'bar'});
    });

    it('request permissions fine', async () => {
      function script() {
        const chromep = new ChromePromise();
        const button = document.createElement('button');
        button.className = 'CHROME_PROMISE_TEST';
        button.onclick = () => {
          window.promise = chromep.permissions.request({
            permissions: ['history'],
          }).then(() => {
            return typeof chromep.history;
          }).catch((err) => {
            return err.message;
          });
        };
        document.body.appendChild(button);
        window.chromep = chromep;
      }

      await page.evaluate(script);
      expect(await page.evaluate(() => typeof window.chromep.history)).to.equal('undefined');
      await page.click('button.CHROME_PROMISE_TEST');
      const text = await page.evaluate(() => window.promise);
      expect(text).to.equal('object');
    });
  });
});
