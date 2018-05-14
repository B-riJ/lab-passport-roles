require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const User         = require('./models/user')
const passport       = require("passport");
const LocalStrategy  = require("passport-local").Strategy;
const session        = require("express-session");
const bcrypt        =require('bcrypt');
//added to run passport

mongoose.Promise = Promise;
mongoose
// database must match /lab-passport-roles
  .connect('mongodb://localhost/lab-passport-roles', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
//available on all pages
app.locals.title = 'Express - Generated with IronGenerator';

//return here to complete passport code



app.use(passport.initialize());
app.use(passport.session());

const index = require('./routes/index');
app.use('/', index);
const authRoutes = require('./routes/loginRouter');
app.use('/', authRoutes)


module.exports = app;
