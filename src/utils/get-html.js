const ow = require('ow');
const axios = require('axios');
const puppeteer = require('puppeteer-core');

const puppeteerLaunchDefaultConfig = {
    headless: true
};

const getHTML = async (
    targetUrl,
    {
        prerender = false,
        puppeteerLaunchConfig = {}
        // proxyUrl=null,
        // prerenderOpts = {},
        // requestConfig = {}
    } = {}
) => {
    ow(targetUrl, ow.string.not.empty);
    const payload = {
        html: null,
        statusCode: null,
        errorMsg: null
    };

    if (!prerender) {
        const response = await axios.get(targetUrl);
        payload.html = response.data;
        payload.statusCode = response.status;
        return payload;
    }

    let browser = null;

    try {
        browser = await puppeteer.launch({
            ...puppeteerLaunchDefaultConfig,
            ...puppeteerLaunchConfig
        });

        console.log('spawning chrome headless');

        const page = await browser.newPage();
        await page.setViewport({
            height: 900,
            width: 1200
        });

        await page.goto(targetUrl, {
            waitUntil: ['domcontentloaded']
        });
        payload.html = await page.content();
        browser.close();
    } catch (error) {
        // console.log('error', error);
        payload.errorMsg = error.message;
    } finally {
        // close browser
        if (browser !== null) {
            console.log('Closing the headless browser');
            await browser.close();
        }
    }

    return payload;
};

module.exports = getHTML;
