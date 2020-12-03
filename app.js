const createError = require('http-errors');
const express = require('express');
require('express-async-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const { ValidationError } = require('express-json-validator-middleware');
const { validate, test } = require('./validator');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/healthcheck', async (req, res) => res.status(200).send({ message: 'pong' }));

// This route validates req.body against the StreetSchema
app.post('/user', validate({ body: test }), (req, res) => {
    // At this point req.body has been validated and you can
    // begin to execute your application code
    res.send('valid');
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use(async (err, req, res, next) => {
    if (err instanceof ValidationError) {
        const { body: errors } = err.validationErrors;
        console.log('errors', errors);
        return res.status(400).send(errors);
    }
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    return res.render('error');
});

module.exports = app;
