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
    	callback(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, callback) {
    	conn.query("SELECT * FROM Users WHERE id = ?", [id], function(err, result) {
    		callback(err, result[0]);
    	});
    });


 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, callback) {

		conn.query("SELECT * FROM Users WHERE username = ?", [username], function(err, result) {
			if (err) {
				return callback(err);
			}
			if (rows.length) {
				return callback(null, false, req.flash('signupMessage', 'That email is already taken.'));
			}

            var new_user = {
            	email: email,
            	password: password
            }

            var insertQuery = "INSERT INTO users ( email, password ) values ('" + email +"','"+ password +"')";
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
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, callback) {
    	conn.query("SELECT * FROM Users WHERE username = ?", [username], function(err, result) {
    		if (err) {
    			return callback(err);
    		}
    		if (!result.length) {
                return callback(null, false, req.flash('loginMessage', 'No user found.'));
            }
			if (result[0].password != password) {
                return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
			}

            return callback(null, result);
        });
    }));

};