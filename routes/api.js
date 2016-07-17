var express = require('express');
var User = require('../models/users');
var router = express.Router();
var mongoose = require('mongoose');
var isLoggedIn = require('./authUtil').isLoggedIn;


router.post('/edit/:id',isLoggedIn,function(req,res){
    User.findOneAndUpdate({_id:req.params.id},{
        first_name:req.body.first_name,
        'local.email':req.body.email
    }).exec().then(function(foundUser){
        res.redirect('/users');
    }).catch(function(err){
        res.render(err);
    })
});


router.delete('/delete/:id',isLoggedIn,function(req,res){
    User.remove({_id:req.params.id}).exec()
    .then(function () {
        res.send('user was removed!!!');
    })
    .catch(function(err){
        res.send(err)
    });
});
module.exports = router;
