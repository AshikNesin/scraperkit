```js
await addToQueue({
	payload: [],
	queueURL: 'https://sqs.us-east-1.amazonaws.com/xxxx/QueueName'
});
```

```js
const { xRayUtils } = require('scraperkit');

const { puppeteerDriver, filters } = xRayUtils;

x.driver(
	puppeteerDriver({
		launchOptions: config.puppeteerLaunchOptions,
		gotoOptions: {
			// some options to pass to .goto()
			waitUntil: 'networkidle0',
			timeout: 600000
		},
		waitForSelector: '.inner-company-info',
		proxy: {
			username: config.proxy.username,
			password: config.proxy.password
		}
	})
);
```
