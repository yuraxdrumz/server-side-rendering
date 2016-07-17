var express = require('express');
var app = express();
var exress_hbs = require('express-handlebars');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash')
var passport = require('passport');
require('./config/passport')(passport);

var port = process.env.PORT || 3000;
var mongoose = require('mongoose');


var webRouter = require('./routes/web');
var apiRouter = require('./routes/api');
var authRouter = require('./routes/auth')(passport);

app.engine('.hbs',exress_hbs({defaultLayout:'body',extname:'.hbs'}));
app.set('view engine','.hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    secret:'express-app',
    resave:false,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(__dirname + '/public'));


mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/test');
var con = mongoose.connection;

con.on('error', console.error.bind(console, 'connection error:'));
con.once('open', function () {
    app.use('/',authRouter);
    app.use('/',webRouter);
    app.use('/api',apiRouter);


    app.listen(port,function(){
        console.log('server is up');
    });
});







