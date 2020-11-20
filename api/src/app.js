const express = require('express');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const ind = require('./routes/index.js');

const { Client, Category } = require('./db.js');

const db = require('./db.js');
 
const server = express();
 
server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
server.use('/', ind)



/////////////////////REINICIANDO DB/////////////////////////
server.get("/reset", (req, res, next) => {	 
	Client.truncate({restartIdentity: true, cascade: true}).then(function(){
			console.log('destroy all Client');
			 
	})
	Category.truncate({restartIdentity: true, cascade: true}).then(function(){
			console.log('destroy all Category');
			 
	})
	 
  });

  

 

module.exports = server;

