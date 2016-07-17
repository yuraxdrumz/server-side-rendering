var express = require('express');
var User = require('../models/users');
var router = express.Router();
var mongoose = require('mongoose');
var isLoggedIn = require('./authUtil').isLoggedIn;

router.get('/',function(req,res){
    res.render('homepage',{user:req.user});
});
router.get('/users',isLoggedIn,function(req,res){
    User.find().exec().then(function(users){
        res.render('users',{users:users,user:req.user});
    }).catch(function(err){
        res.error(err);
    })
});
router.get('/new-user',function(req,res){
    res.render('new-user');
});

router.get('/edit/:id',isLoggedIn,function(req,res){
    User.find({_id:req.params.id}).exec().then(function(foundUser){
        res.render('edit',{user:foundUser[0]});

    }).catch(function(err){
        res.error(err)
    });
});

module.exports = router;
