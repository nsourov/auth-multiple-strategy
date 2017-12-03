const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const authCheck = require('../config/authCheck');

// GET ROUTES
router.get('/', (req,res)=>{
  res.redirect('login');
});

router.get('/login', (req,res)=>{
  res.render('login');
});

router.get('/logout', (req,res)=>{
  req.logout();
  req.flash('warning', 'You are logged out!')
  res.redirect('/login')
});

router.get('/profile', authCheck.isLoggedIn,(req,res)=>{
  res.render('profile', {
    githubname: req.user.githubname,
    googlename: req.user.googlename,
    facebookname: req.user.facebookname,
    username: req.user.username
  });
});

router.post('/register', (req,res)=>{
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  User.register(new User({username: username, email: email}), password,(err,user)=>{
    if(err){
      console.log(err)
      if(err.code === 11000){
        req.flash('duplicate', 'Email already exists')  
      } else{
        req.flash('warning', err.message)
      }
      return res.redirect('/login');
    } else{
      passport.authenticate('local')(req,res,()=>{
        req.flash('success', 'Successfully Registered')
        res.redirect('/profile')
      })
    }
  });
});



router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}), (req,res)=>{
  // req.flash('success', 'Successfully Logged in!')
  // res.redirect('/profile')
});


module.exports = router;