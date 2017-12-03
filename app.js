var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

// view engine setup
app.engine('.html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));

//midleware
app.use(session({
    key: 'username',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 60 * 60
    }
}));

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

app.use(function(req, res, next) {
    if (req.cookies.username && !req.session.username) {
        res.clearCookie('username');
    }
    next();
});
//end midleware


// controller
app.get('/', function(req, res) {
    res.redirect('/index');
});
app.use('/index', require('./controllers/indexController'));
app.use('/authen', require('./controllers/authenController'));
app.use('/api', require('./controllers/apiController'));
//end controller


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;