const express = require('express');

const router = express.Router();
const eventEmitterRoute = require('./eventEmitter');
const messageBrokerRoute = require('./messageBroker');
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

router.use('/event-emitter', eventEmitterRoute);
router.use('/message-broker', messageBrokerRoute);

module.exports = router;
