var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); //解析cookies
var logger = require('morgan');
let session = require("express-session"); //引入session
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let sessionRouter = require("./routes/session");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// 使用session,设置session
app.use(session({
    secret: "turnip",
    resave: true, //强制保存
    saveUninitialized: true, //初始化session
    cookie: { Path: "/" }
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//secret开启加密
app.use(cookieParser("secret"));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/session", sessionRouter)
    // catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
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

app.listen(8000);

module.exports = app;