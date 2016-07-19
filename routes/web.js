var express = require('express');
var User = require('../models/users');
var router = express.Router();
var mongoose = require('mongoose');
var isLoggedIn = require('./authUtil').isLoggedIn;

router.get('/',function(req,res){
    if(req.user){
        var active = req.user[0]
        res.render('homepage',{user:active});
    }else{
        res.render('homepage');
    }

});
router.get('/users',isLoggedIn,function(req,res){
    var all = [];
    User.find().exec().then(function(users){
        for(var i=0,ii=users.length;i<ii;i++){
            if(users[i].local.email !== req.user[0].local.email){
                all.push(users[i])
            }
        }
        res.render('users',{users:all,user:req.user[0]});
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
