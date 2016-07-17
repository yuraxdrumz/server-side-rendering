var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('../models/users');

var router = express.Router();

module.exports = function(passport){
    router.post('/login',
    passport.authenticate('local-login',        {successRedirect:'/users',failureRedirect:'/',failureFlash:true}));

    router.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    router.post('/signup',
    passport.authenticate('local-signup', {successRedirect: '/users', failureRedirect: '/', failureFlash: true}));

    return router;
}
