require('dotenv').config();
require('./db');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


const checkToken = require('./middlewares/checkToken');
const verifyToken = require('./middlewares/verifyToken');
const indexRouter = require('./controller/index');
const authRouter = require('./controller/auth');
const usersController = require('./controller/usersController');
const gamesController = require('./controller/gamesController');
const wordsController = require('./controller/wordsController');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api/users', usersController);
app.use('/api/games', checkToken, verifyToken, gamesController);
app.use('/api/search', checkToken, verifyToken, wordsController);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;