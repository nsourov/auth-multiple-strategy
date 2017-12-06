const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const Post = require('../models/post');
const authCheck = require('../config/authCheck');

// GET ROUTES
router.get('/', authCheck.isLoggedIn, (req,res)=>{
  Post.find({},(err,data)=>{
    if(err) throw err;
    res.render('home',{user: req.user, data});
  })
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


router.post('/create/post', (req,res)=>{
  const title = req.body.title;
  const content = req.body.content;
  let post = new Post({
    title: title,
    content: content,
    author: {
      id: req.user._id,
      name: req.user.username
    }
  });
  post.save((err,data)=>{
    if(err) throw err;
    console.log('Data Saved');
    res.redirect('/')
  });
})

router.delete('/post/delete/:id',(req,res)=>{
  console.log(req.user._id)
    if(req.isAuthenticated()){
      Post.findByIdAndRemove({_id: req.params.id},(err,data)=>{
      if(err) throw err;
        return res.redirect('/')
      console.log(data)
    })
  }  
})

module.exports = router;