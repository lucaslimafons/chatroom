const express = require('express');
const path = require('path');
const routes = require('../routes/index')
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const moverride = require('method-override');
const session = require('express-session');
const cors = require('./cors');
require('dotenv').config();
const passport = require('passport');
require('./passport');

let app = express();

app.use(compression())
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }))
app.use(cookieParser());
app.use(moverride('X-HTTP-Method-Override'));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }))
app.use(express.static(path.join(process.cwd(), 'public')));
app.set('views', path.join(process.cwd(), 'views'));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

require('./kafka');
require('./kafka-producer');
require('./kafka-consumer');

// Production error handler
if (app.get('env') === 'production') {
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.sendStatus(err.status || 500)
  })
}

module.exports = app;
