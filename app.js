var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var index = require('./routes/index');
var users = require('./routes/users');
var tasks = require('./routes/tasks')

var showdata = require('./recoreTalent_operations/operations');

var app = express();

 //view engine setup
app.set('views', path.join(__dirname, '/client/src'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(expressSession({
//  secret : 'recore',
//  resave : true,
//  saveUninitialized : true
//}));

app.use(expressSession({
  secret : 'recore',
  resave : true,
  saveUninitialized: true
}));

app.use('/', express.static('client/src'));
app.use(express.static(path.join(__dirname, 'client')));

//// for parsable files
//app.get(/.*.\w{2,4}$/, function(req, res){
//  console.log('here is your path:',path.join(__dirname,req.url));
//  res.sendFile(path.join(__dirname,req.url));
//})

app.use('/', index);
app.use('/home', index);
app.use('/dashboard', index);
app.use('/dashboard/hrTalent', index);
app.use('/dashboard/STalent', index);
app.use('/dashboard/myTalent', index);
app.use('/dashboard/OperationTalent', index);
app.use('/dashboard/OperationInTalent', index);
app.use('/dashboard/ActiveSearch', index);
app.use('/home/login', index);
app.use('/admin/addResume', index);
app.use('/admin/home', index);
app.use('/admin/users', index);
app.use('/admin/contactUs', index);
app.use('/admin/talent', index);
app.use('/admin/qualification', index);
app.use('/admin/desired', index);
app.use('/admin/skills', index);
app.use('/admin/interviewSchedule', index);

//app.use('/admin/addResume', index);
//app.use('/admin/addResume', index);
//app.use('/admin/addResume', index);


app.get("/a/verify", function(req,res){
  console.log('verify',req.query.username);
  showdata.verifyUser(req.query.username, function(data){
    if(data){
      if(data === 'ok'){
        console.log("Congractulations! Sign In For Further Services!......");
        res.redirect('http://localhost:3000/');
      }else{
        console.log(data);
      }
    }
  }) ;
});

//app.use('/users', users);
app.use('/a', tasks);



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
