var mongoose = require('mongoose');
var crypto = require('crypto');
var UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name:String,
    last_name:String,
    local:{
        email:{
        type: String,
        unique:true,
        required:true
        }
    },
    google:{
        id:String,
        token:String,
        email:String,
        name:String
    },
    hash:String,
    salt:String
});

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
}

UserSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
}


module.exports = mongoose.model('User', UserSchema);
