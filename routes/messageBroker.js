const express = require('express');
const path = require('path');
require('dotenv').config();
// { path: path.resolve(process.cwd(), '../.env') }
const router = express.Router();
const amqp = require('amqplib');
const { publishToChannel } = require('../services');
/* GET users listing. */
router.get('/healthcheck', (req, res, next) => {
    res.send('It\'s is message-broker');
});

let lastRequestId = 1;
// RabbitMQ connection string
const messageQueueConnectionString = process.env.CLOUDAMQP_URL;

// handle the request
router.post('/api/v1/process-data', async (req, res) => {
    // save request id and increment
    const requestId = lastRequestId;
    lastRequestId += 1;

    // connect to Rabbit MQ and create a channel
    const connection = await amqp.connect(messageQueueConnectionString);
    const channel = await connection.createConfirmChannel();

    // publish the data to Rabbit MQ
    const requestData = req.body.data;
    console.log('Published a request message, requestId:', requestId);
    await publishToChannel(channel, { routingKey: 'request', exchangeName: 'processing', data: { requestId, requestData } });

    // send the request id in the response
    res.send({ requestId });
});
