# Scraperkit
Common utility functions that regularly need in web scrapper apps.

## getHTML

```js
const {getHTML} = require('scraperkit')
const res = await getHTML('https://example.com', {
        prerender: true,
        puppeteerOpts: {
            executablePath: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
        }
    });
console.log(res);
```

## TODO
- [] Add proxy support for getHTML

## Resources
- https://github.com/axios/axios/issues/925