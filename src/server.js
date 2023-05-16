require('dotenv').config();
const express = require('express');
const configviewEngine = require('./config/viewEngine.js');
const webRoutes = require('./routers/web.js');
const connectFlash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

const app = express(); //app express
const port = process.env.PORT || 8081;
const hostname = process.env.HOST_NAME;

//config req.body
app.use(express.json()) //for json
app.use(express.urlencoded({extended: true})) //for form data
//get database

//config template engine
configviewEngine(app);

//config passport middleware
app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

//khai báo route
app.use('/', webRoutes);

//Bật flash message
app.use(connectFlash());
//
var server = app.listen(port,hostname, function() {
  console.log('Server listening on port ' + server.address().port);
});
module.exports = app;

//create the connection to database

// simple query
