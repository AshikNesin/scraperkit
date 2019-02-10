const AWS = require('aws-sdk');
const ow = require('ow')

const config = {
	region: 'us-east-1',
	apiVersion: '2012-11-05',
};

const sqs = new AWS.SQS(config);

// 'https://sqs.us-east-1.amazonaws.com/XXXX/QueueName';

const addToQueue = ({payload = [], queueURL = null}) => {

    ow(queueURL, ow.string.not.empty);

	payload.map(q => {
		const msg = q;
		const sqsParams = {
			MessageBody: JSON.stringify(msg),
			QueueUrl: queueURL,
		};

		sqs.sendMessage(sqsParams, (err:any, data:any) => {
			if (err) {
				console.log('ERR', err);
			}

			console.log(data);
		});
	});
};

export default addToQueue;

