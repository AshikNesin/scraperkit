# Scraperkit

Common utility functions that regularly need in web scrapper apps.

## getHTML

```js
const { getHTML } = require('scraperkit');
const res = await getHTML('https://example.com', {
  prerender: true,
  puppeteerLaunchConfig: {
    executablePath: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
  }
});
console.log(res);
```

## getSelectors

```js
const htmlContent = `<html>...</html>`;
const selectors = getSelectors(htmlContent, ['meta', 'h1']);
```

## TODO

- [ ] Add proxy support for getHTML
- [ ] Make it easy to debug issues

## Resources

- https://github.com/axios/axios/issues/925
