const amqp = require('amqplib');

require('dotenv').config();
// RabbitMQ connection string
const messageQueueConnectionString = process.env.CLOUDAMQP_URL;

// utility function to publish messages to a channel
function publishToChannel(channel, { routingKey, exchangeName, data }) {
    return new Promise((resolve, reject) => {
        channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(data), 'utf-8'), { persistent: true }, (err, ok) => {
            if (err) {
                return reject(err);
            }

            return resolve();
        });
    });
}

async function listenForResults() {
    // connect to Rabbit MQ
    const connection = await amqp.connect(messageQueueConnectionString);

    // create a channel and prefetch 1 message at a time
    const channel = await connection.createChannel();
    await channel.prefetch(1);

    // start consuming messages
    await consume({ connection, channel });
}

// consume messages from RabbitMQ
function consume({ connection, channel, resultsChannel }) {
    return new Promise((resolve, reject) => {
        channel.consume('processing.results', async (msg) => {
            // parse message
            const msgBody = msg.content.toString();
            const data = JSON.parse(msgBody);
            const { requestId, processingResults } = data;
            console.log('Received a result message, requestId:', requestId, 'processingResults:', processingResults);
            // acknowledge message as received
            await channel.ack(msg);
        });

        // handle connection closed
        connection.on('close', (err) => reject(err));

        // handle errors
        connection.on('error', (err) => reject(err));
    });
}

module.exports = {
    listenForResults,
    publishToChannel,
};
