var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose")

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require("./routes/auth");
var commentRouter = require('./routes/comment');
var profileRouter = require('./routes/profile')
var mapRouter =require('./routes/map');

var app = express();

mongoose.connect('mongodb://localhost/hoody', {useNewUrlParser: true, useUnifiedTopology: true })
.then(x => {
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
})
.catch(err => {
  console.error('Error connecting to mongo', err)
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// MIDDLEWARE
app.use(logger('combined', {skip: function (req, res) { return res.statusCode < 400}}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// EXPRESS SESSION MIDDLEWARE    -  req.session.currentUser
app.use(
  session({
    secret: "secretword",
    // cookie: { maxAge: 3600000 } // 1 hour
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24 * 7, // Default - 14 days
    }),
  }),
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/comment', commentRouter);
app.use('/profile', profileRouter);
app.use('/map', mapRouter);

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
  if(err.status==404){
    res.render('error', {messageError: "There was an error 404"});  
  } else {
    res.render('error', {messageError: "There was an error"});
  }
});

module.exports = app;
