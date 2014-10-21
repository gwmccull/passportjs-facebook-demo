var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated()) {
		return next();
	}
	// if the user is not authenticated then redirect him to the login page
	console.error('not authenticated');
	res.redirect('/');
};

module.exports = function(passport) {
	/* GET home page. */
	router.get('/', function (req, res) {
		res.render('index', { title: 'Welcome!' });
	});

	/* GET Home Page */
	router.get('/home', isAuthenticated, function (req, res) {
		res.render('home', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	/* Facebook */
	router.get('/auth/facebook',
		passport.authenticate('facebook'),
		function (req, res) {
		}
	);
	router.get('/auth/facebook/callback',
		passport.authenticate('facebook', { failureRedirect: '/' }),
		function (req, res) {
			//console.log(req);
			res.redirect('/home');
		}
	);

	return router;
}
