const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/healthcheck', (req, res, next) => {
    res.send('It\'s is event emitter');
});

module.exports = router;
