var config = require('../config/oauth.js');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');


module.exports = function(passport) {
	'use strict';

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	passport.serializeUser(function(user, done) {
		//console.log('serializing user: ');console.log(user);
		done(null, user);
	});
	passport.deserializeUser(function(user, done) {
		//console.log('user', user);
		User.findById(user._id, function(err, user) {
			//console.log('deserializing user:',user);
			done(err, user);
		});
	});

	passport.use(new FacebookStrategy({
			clientID: config.facebook.clientID,
			clientSecret: config.facebook.clientSecret,
			callbackURL: config.facebook.callbackURL
		},
		function (accessToken, refreshToken, profile, done) {
			process.nextTick(function () {
				User.findOne({oauthId: profile.id}, function(err, user) {
					if (err) { console.log(err); }
					if (!err && user !== null) {
						console.log('found user', user);
						done(null, user);
					} else {
						console.log(profile);
						var newUser = new User({
							oauthId: profile.id,
							firstName: profile.name.givenName,
							lastName: profile.name.familyName
						});
						newUser.save(function(err) {
							if (err) {
								console.log(err);
							} else {
								console.log('saving user....');
								done(null, newUser);
							}
						});
					}
				});
			});
		}
	));
};
