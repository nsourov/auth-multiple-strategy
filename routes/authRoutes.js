const express = require('express');
const router = express.Router();
const passport = require('passport');

//GITHUB AUTH
router.get('/github',passport.authenticate('github',{scope:['user:email']}));

//GITHUB AUTH CALL BACK
router.get('/github/redirect', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect profile.
    res.redirect('/profile');
});

//GOOGLE AUTH
router.get('/google',passport.authenticate('google',{scope: ['profile']}));

//GOOGLE AUTH CALL BACK
router.get('/google/redirect', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect profile.
    res.redirect('/profile');
});


//FACEBOOK AUTH
router.get('/facebook',passport.authenticate('facebook',{ authType: 'rerequest', scope: ['user_friends','manage_pages']}));

//FACEBOOK AUTH CALL BACK
router.get('/facebook/redirect', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect profile.
    res.redirect('/profile');
});



module.exports = router;