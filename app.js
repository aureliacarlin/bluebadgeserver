 require('dotenv').config();

 var express = require('express');
 var app = express();
 let sequelize = require('./db')
 let user = require('./controllers/usercontroller')
 let objects = require('./controllers/objectscontroller')
 let settings = require('./controllers/settingscontroller')
 let stories = require('./controllers/storyController')
 

 const bodyParser = require('body-parser')

 sequelize.sync();

 app.use(require('./middleware/headers'))

 app.use(bodyParser.json())

 app.listen(4000, function() {
     console.log('App is listening on 4000.')
 })


 app.use('/user', user)
 app.use('/objects', objects)
 app.use('/settings', settings) 
 app.use('/stories', stories)
 
 
 
 