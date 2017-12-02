const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./keys');
const User = require('../models/user');

//SERIALIZE AND DESERIALIZE USER
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});



//GITHUB
passport.use(new GithubStrategy({
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret,
    callbackURL: keys.github.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    //CHECK THE NEW USER IS ALREADY IN DB
		User.findOne({githubId:profile.id})
		.then((currentUser)=>{
			if(currentUser){
				//ALREADY HAVE THE USER
				console.log(`${currentUser.githubname} is already member`)
				done(null, currentUser)
			} else{
				console.log(profile)
				//CREATE THE USER
				new User({
					githubId: profile.id,
					githubname: profile.displayName
				})
				.save()
					.then((newUser)=>{
						console.log(newUser)
						done(null, newUser)
				}).catch((err)=>{
					if(err) console.log(err);
				})
			}
		}).catch((err)=>{
			if(err) console.log(err);
		})
  }
));

//GOOGLE
passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: keys.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    //CHECK THE NEW USER IS ALREADY IN DB
		User.findOne({googleId:profile.id})
		.then((currentUser)=>{
			if(currentUser){
				//ALREADY HAVE THE USER
				console.log(`${currentUser.googlename} is already member`)
				done(null, currentUser)
			} else{
				console.log(profile)
				//CREATE THE USER
				new User({
					googleId: profile.id,
					googlename: profile.displayName
				})
				.save()
					.then((newUser)=>{
						console.log(newUser)
						done(null, newUser)
				}).catch((err)=>{
					if(err) console.log(err);
				})
			}
		}).catch((err)=>{
			if(err) console.log(err);
		})
  }
));



//FACEBOOK
passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: keys.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    //CHECK THE NEW USER IS ALREADY IN DB
		User.findOne({facebookId:profile.id})
		.then((currentUser)=>{
			if(currentUser){
				//ALREADY HAVE THE USER
				console.log(`${currentUser.facebookname} is already member`)
				done(null, currentUser)
			} else{
				console.log(profile)
				//CREATE THE USER
				new User({
					facebookId: profile.id,
					facebookname: profile.displayName
				})
				.save()
					.then((newUser)=>{
						console.log(newUser)
						done(null, newUser)
				}).catch((err)=>{
					if(err) console.log(err);
				})
			}
		}).catch((err)=>{
			if(err) console.log(err);
		})
  }
));