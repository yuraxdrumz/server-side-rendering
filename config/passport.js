var mongoose = require('mongoose');
var User = require('../models/users');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google').Strategy;

module.exports = function(passport){
    passport.serializeUser(function(user,done){
        return done(null, user._id);
    });
    passport.deserializeUser(function(id,done){
        User.find({_id:id}).exec().then(function(user){
            return done(null,user)
        })
        .catch(function(err){
            return done(err);
        })
    })

passport.use('local-login',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},

 function(req,email,password,done){
    User.findOne({'local.email':email}).exec().then(function(user){
        if(!user){
            return done(null,false,req.flash('message','No user found'));
        }
        if( !(user.validPassword(password)) ){
            return done(null,false,req.flash('message','Oops! wrong password'));
        }
        return done(null, user)
    })
    .catch(function(err){
        return done(err)
    });
}))
    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form

            User.findOne({'local.email':email})
                .exec()
                .then(function(user){
                    if (user) {
                        return done(null, false, req.flash('message', 'This email is taken.')); // req.flash is the way to set flashdata using connect-flash
                    }else{

                        user = new User({
                            _id            : mongoose.Types.ObjectId(),
                            first_name     : req.body.first_name,
                            'local.email'  : email
                        });

                        user.setPassword(req.body.password)
                        console.log(user)
                        user.save()
                            .then(function() {
                                return done(null, user);
                            })
                            .catch(function(err){
                                return done(err);
                            });
                    }
                })
                .catch(function(err){
                    return done(err);
                });

        }));
}
