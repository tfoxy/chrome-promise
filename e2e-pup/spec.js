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

  describe('with ChromePromise', () => {
    const chromePromiseScript = fs.readFileSync('chrome-promise.js', {
      encoding: 'utf8'
    });

    beforeEach(async () => {
      await page.evaluate(chromePromiseScript);
    });

    it('successfully requests history permission', async () => {
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

    it('successfully requests system.cpu permission', async () => {
      function script() {
        const chromep = new ChromePromise();
        const button = document.createElement('button');
        button.className = 'CHROME_PROMISE_TEST';
        button.onclick = () => {
          window.promise = chromep.permissions.request({
            permissions: ['system.cpu'],
          }).then(() => {
            return typeof chromep.system;
          }).catch((err) => {
            return err.message;
          });
        };
        document.body.appendChild(button);
        window.chromep = chromep;
      }

      await page.evaluate(script);
      expect(await page.evaluate(() => typeof window.chromep.system)).to.equal('undefined');
      await page.click('button.CHROME_PROMISE_TEST');
      const text = await page.evaluate(() => window.promise);
      expect(text).to.equal('object');
    });
  });
});
