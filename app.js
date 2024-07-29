var express = require('express');
var path = require('path');
const session = require('express-session'); 
const flash = require('connect-flash'); 
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
const setUserGlobal = require('./middleware/setUserGlobal')

var allRoutes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ 
    secret:'geeksforgeeks', 
    saveUninitialized: true, 
    resave: true
})); 
  
app.use(flash()); 

app.use(setUserGlobal)

app.use('/', allRoutes);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.locals.user = req.session.user || null;
	// render the error page
	res.status(err.status || 500);
	res.render('error');
	next();
});

module.exports = app;
