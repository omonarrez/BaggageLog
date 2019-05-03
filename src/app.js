const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection');

      var dateFormat = require('dateformat');
var now = new Date();

var ghpages = require("gh-pages");

ghpages.publish("dist", function(err) {});


const app = express();

// importing routes
const BaggageRoutes = require('./routes/baggageDelivery');


 
// Basic usage
console.log(dateFormat('05/03/2019 07:12 AM', "h:MM"));
// Saturday, June 9th, 2007, 5:46:21 PM
// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'baggagelog'
}, 'single'));
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', BaggageRoutes);
//app.use('/check-in', checkInRoute);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
