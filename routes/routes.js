const express = require('express');
const router = express.Router();
const passport = require('passport');
const authCheck = require('../config/authCheck');

// GET ROUTES
router.get('/register', (req,res)=>{
  res.render('register');
});

router.get('/login', (req,res)=>{
  res.render('login');
});

router.get('/logout', (req,res)=>{
  req.logout();
  res.redirect('/login')
});

router.get('/profile', authCheck.isLoggedIn,(req,res)=>{
  res.send(`Hi ${req.user.githubname || req.user.googlename || req.user.facebookname || req.user.username} <br> <a href="/logout">Logout</a>`);
});

router.post('/register', (req,res)=>{
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


router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}), (req,res)=>{});


module.exports = router;