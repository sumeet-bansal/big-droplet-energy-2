var LocalStrategy   = require('passport-local').Strategy;

var mysql = require('mysql');

var conn = mysql.createConnection({
	user: 'root',
	password: 'space bar',
	database: 'collector'
});

module.exports = function(passport) {

	// =========================================================================
	// passport session setup ==================================================
	// =========================================================================
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser(function(user, callback) {
		return callback(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, callback) {
		conn.query("SELECT * FROM Users WHERE id = ?", [id], function(err, result) {
			return callback(err, result[0]);
		});
	});

	// =========================================================================
	// LOCAL SIGNUP ============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, username, password, callback) {
		conn.query("SELECT * FROM Users WHERE username = ?", [username], function(err, result) {
			if (err) {
				console.log(err);
				return callback(err);
			}
			if (result.length) {
				console.log('signupMessage', 'That username is already taken.')
				return callback(null, false);
			}
			let new_user = {
				username: username,
				password: password
			}
			conn.query("INSERT INTO Users SET ?", new_user, function(err, result) {
				new_user.id = result.insertId;
				return callback(null, new_user);
			});
		});
	}));

	// =========================================================================
	// LOCAL LOGIN =============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-login', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, username, password, callback) {
		conn.query("SELECT * FROM Users WHERE username = ?", [username], function(err, result) {
			console.log(result);
			if (err) {
				return callback(err);
			}
			if (!result.length) {
				console.log('loginMessage', 'No user found.');
				return callback(null, false);
			}
			if (result[0].password != password) {
				console.log('loginMessage', 'Oops! Wrong password.');
				return callback(null, false);
			}
			let user = {
				username: username,
				id: result[0].id
			}
			return callback(null, user);
		});
	}));

};