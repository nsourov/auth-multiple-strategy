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

//ROUTES
app.use('/auth', authRoute);
app.use('/', Route);

//PASSPORT LOCAL
passport.use(new LocalStrategy(User.authenticate()));

