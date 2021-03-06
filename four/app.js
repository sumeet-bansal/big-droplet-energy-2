var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var passport_config = require('./config/passport');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'bigdropletenergy',
	saveUninitialized: true,
	resave: true
}));

passport_config(passport);
app.use(passport.initialize());
app.use(passport.session());


app.use('/signup', require('./routes/signup'));
app.post('/signup-auth', passport.authenticate('local-signup', {
	successRedirect: '/',
	failureRedirect: 'signup',
	failureFlash: true
}));

app.use('/login', require('./routes/login'));
app.post('/login-auth', passport.authenticate('local-login', {
	successRedirect: '/',
	failureRedirect: 'login',
	failureFlash: true
}));

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

// adminchecker
var isadmin = function(req, res, next) {
	if (req.user.admin) {
		return next();
	} else {
		return res.render('notadmin');
	}
}

// authchecker
var isauth = function(req, res, next) {
	if (req.user) {
		console.log(req.user);
		return next();
	} else {
		return res.render('login');
	}
}

app.use('/', isauth, require('./routes/index'));
app.use('/data', isauth, require('./routes/data'));
app.use('/user', isauth, require('./routes/user'));
app.use('/pdf', isauth, require('./routes/pdf'));

// useradmin CRUD
app.use('/deleteuser', isadmin, require('./routes/deleteuser'));
app.use('/createuser', isadmin, require('./routes/createuser'));
app.use('/edituser', isadmin, require('./routes/edituser'));

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
	res.render('404');
});

module.exports = app;
