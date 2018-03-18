const path = require('path');
const fs = require('fs');
const { expect } = require('chai');
const puppeteer = require('puppeteer');

describe('chrome extension page', () => {
  let browser, page;

  before(async () => {
    const pathToExtension = path.resolve(__dirname, '..', 'e2e-app');
    const puppeteerOptions = {
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    };
    if (process.env.TRAVIS) {
      puppeteerOptions.args.push('--no-sandbox', '--disable-setuid-sandbox');
      console.log('Launching puppeteer...');
    }
    browser = await puppeteer.launch(puppeteerOptions);
    if (process.env.TRAVIS) {
      console.log('Puppeteer launched.');
      await new Promise(cb => setTimeout(cb, 10));
      console.log('Opening new page...');
    }
    page = await browser.newPage();
    if (process.env.TRAVIS) {
      console.log('Page opened.');
      await new Promise(cb => setTimeout(cb, 10));
      console.log('Starting...');
    }
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

    it('catches an error when chrome.runtime.lastError exists', async () => {
      function script() {
        var chromep = new ChromePromise();

        return chromep.tabs.get(0).then(() => {
          return 'NO_ERROR';
        }, () => {
          return 'ERROR';
        });
      }

      expect(await page.evaluate(script)).to.equal('ERROR');
    });

    it('catches an error when a function is called' +
        ' without matching its definition', async () => {
      function script() {
        var chromep = new ChromePromise();

        return chromep.tabs.query().then(() => {
          return 'NO_ERROR';
        }, () => {
          return 'ERROR';
        });
      }

      expect(await page.evaluate(script)).to.equal('ERROR');
    });

  });
});
