const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('./models/user');
const keys = require('./config/keys');
const authCheck = require('./config/authCheck')
const passportSetup = require('./config/passport');

//CONNECTION DB
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongodb.dbURI,{
  useMongoClient: true
}).then(()=>{console.log('DB CONNECTED')})


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(process.env.PORT||3000,()=>{console.log('SERVER RUNNING')});
app.set('view engine', 'ejs');

//SESSION
app.use(require('express-session')({
	secret: keys.session.secret,
	resave: false,
	saveUninitialized: false
}));

//PASSPORT
app.use(passport.initialize());
app.use(passport.session());
//PASSPORT LOCAL
passport.use(new LocalStrategy(User.authenticate()));


// GET ROUTES
app.get('/register', (req,res)=>{
	res.render('register');
});

app.get('/login', (req,res)=>{
	res.render('login');
});

app.get('/logout', (req,res)=>{
	req.logout();
	res.redirect('/login')
});

app.get('/profile', authCheck.isLoggedIn,(req,res)=>{
	res.send(`Hi ${req.user.githubname || req.user.googlename || req.user.facebookname || req.user.username} <br> <a href="/logout">Logout</a>`);
});





//GITHUB AUTH
app.get('/github',passport.authenticate('github',{scope:['user:email']}));

//GITHUB AUTH CALL BACK
app.get('/github/redirect', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect profile.
    res.redirect('/profile');
});

//GOOGLE AUTH
app.get('/google',passport.authenticate('google',{scope: ['profile']}));

//GOOGLE AUTH CALL BACK
app.get('/google/redirect', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect profile.
    res.redirect('/profile');
});


//FACEBOOK AUTH
app.get('/facebook',passport.authenticate('facebook',{ authType: 'rerequest', scope: ['user_friends','manage_pages']}));

//FACEBOOK AUTH CALL BACK
app.get('/facebook/redirect', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect profile.
    res.redirect('/profile');
});





app.post('/register', (req,res)=>{
	let username = req.body.username;
	let password = req.body.password;
	User.register(new User({username: username}), password,(err,user)=>{
		if(err){
			return res.render('register');
		} else{
			passport.authenticate('local')(req,res,()=>{
				res.redirect('/profile')
			})
		}
	});
});


app.post('/login', passport.authenticate('local', {
	successRedirect: '/profile',
	failureRedirect: '/login'
}), (req,res)=>{});