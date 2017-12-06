const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('./models/user');
const keys = require('./config/keys');
const passportSetup = require('./config/passport');
const authRoute = require('./routes/authRoutes');
const Route = require('./routes/routes');
const flash = require('connect-flash');
const methodOverride = require('method-override')
//CONNECTION DB
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongodb.dbURI,{
  useMongoClient: true
}).then(()=>{console.log('DB CONNECTED')})

app.use(flash());


app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(process.env.PORT||3000,()=>{console.log('SERVER RUNNING')});
app.set('view engine', 'ejs');
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))



//SESSION
app.use(require('express-session')({
	secret: keys.session.secret,
	resave: false,
	saveUninitialized: false
}));


//Flash
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.warning = req.flash('warning');
  res.locals.success = req.flash('success');
  res.locals.duplicate = req.flash('duplicate');
  next();
});

//PASSPORT
app.use(passport.initialize());
app.use(passport.session());

//PASSPORT LOCAL
passport.use(new LocalStrategy(User.authenticate()));

//ROUTES
app.use('/auth', authRoute);
app.use('/', Route);

