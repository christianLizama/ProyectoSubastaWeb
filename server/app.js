var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http').createServer(app);

// const mongoose = require('mongoose')
// mongoose.connect('mongodb://mongo1/mydatabase')
//   .then(db => console.log('base de datos conectada'))
//   .catch(err => console.log(err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const appPort = process.env.APPPORT

app.listen(appPort, () => console.log(`App listening on port ${appPort}!`))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const io = require('socket.io')(http, {
  allowEIO3: true,
  cors: {
      origin: true,
      credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('my message', (msg) => {
    console.log('message: ' + msg);
  });
  socket.on('my message', (msg) => {
    io.emit('my broadcast', `server: ${msg}`);
  });
});

//Puerto de socket
var portsocket = process.env.SOCKETPORT;

http.listen(portsocket, () => {
  console.log('listening on :',portsocket);
});

module.exports = app;
