const ow = require('ow');
const axios = require('axios');
const puppeteer = require('puppeteer-core');

// interface payloadType {
//     html: string | null;
//     statusCode: number | null;
//     raw: AxiosResponse<any> | null;
//     errorMsg: string | null;
// }

// interface puppeteerOptsType {
//     executablePath: string | null;
// }

// const localChromePath = `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`;

const puppeteerDefaultConfig = {
    headless: true,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--start-maximized',
        '--single-process',
        `--window-size=1200,900` // you can also use '--start-fullscreen'
    ]
};

const getHTML = async (
    targetUrl,
    {
        prerender = false,
        // proxyUrl=null,
        puppeteerOpts = {}
        // prerenderOpts = {},
        // requestConfig = {}
    } = {}
) => {
    ow(targetUrl, ow.string.not.empty);
    const payload = {
        html: null,
        statusCode: null,
        raw: null,
        errorMsg: null
    };

    if (!prerender) {
        const response = await axios.get(targetUrl);
        payload.raw = response;
        payload.html = response.data;
        payload.statusCode = response.status;
        return payload;
    }

    ow(puppeteerOpts.executablePath, ow.string.not.empty);

    let browser = null;

    try {
        browser = await puppeteer.launch({
            ...puppeteerDefaultConfig,
            ...puppeteerOpts
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

export default getHTML;
