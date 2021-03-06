var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

fs.readdirSync('./routes').forEach((file) => {
  let propsName = file.split(".")[0];

  if(file.split(".").pop() === propsName) {
    
    fs.readdirSync(`./routes/${propsName}`).forEach((file2) => {
      if(file2.split(".").pop() === 'js') {
        let props = require(`./routes/${propsName}/` + file2);
        app.use(props.name, props.router)
      }
    })

  } else {
    if(file.split(".").pop() === 'js') {
      let props = require('./routes/' + file);
      app.use(props.name, props.router)
    }
  }
})

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

module.exports = app;
