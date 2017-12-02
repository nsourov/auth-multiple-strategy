//ADD THIS FILE TO .GITIGNORE

module.exports = {
	session: {
		secret: 'secretkey'
	},
	github: {
		clientID: '54d16f476730105cd241',
		clientSecret: 'fdf18bb2f912467a9a00d85da3b97b539d8be79c',
		callbackURL: "/github/redirect"
	},
	google: {
		clientID: '63431100475-3c0isk2l1eop7kk1u5bo6clferm7nceq.apps.googleusercontent.com',
		clientSecret: 'ltM6dkOtW9kFB7d7QRgpZ8Ej',
		callbackURL: "/google/redirect"
	},
	facebook: {
		clientID: '382531812202720',
		clientSecret: '14a8e802573c069c9b4dce67cda3a47c',
		callbackURL: "/facebook/redirect"
	},
	mongodb : {
		dbURI: 'mongodb://localhost/auth_demo'
	}
};