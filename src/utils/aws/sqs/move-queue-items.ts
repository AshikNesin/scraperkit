const AWS = require('aws-sdk');
const Consumer = require('sqs-consumer');
const addToQueue = require('./enqueue');
const ow = require('ow')

const config = {
	region: 'us-east-1',
	apiVersion: '2012-11-05',
};


const moveQueueItems = async ({sourceQueueUrl=null, targetQueueUrl=null}) => {
    ow(sourceQueueUrl, ow.string.not.empty);
	ow(targetQueueUrl, ow.string.not.empty);

	const app = Consumer.create({
		queueUrl: sourceQueueUrl,
		handleMessage: async (message:{Body:string}) => {
			try {

				console.log(message.Body);

				const task = JSON.parse(message.Body);
				addToQueue({
					payload: [task],
					queueUrl: targetQueueUrl
				});

				return Promise.resolve();
			} catch (e) {
				console.log(e)
			}
		},
		sqs: new AWS.SQS(config),
	});

	app.on('error', (err:{message:string}) => {
		console.log(err.message);
	});

	app.on('processing_error', (err:{message:string}) => {
		console.error(err.message);
	});

	return app;

}

export default moveQueueItems;