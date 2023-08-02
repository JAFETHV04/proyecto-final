const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');

app.use(session({
	secret : 'webslesson',
	resave : true,
	saveUninitialized : true
  }));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs');
//app.use(express.static(path.join(__dirname, 'ejs')));

//app.get('/', function(request, response) {
	// Render login template
//	response.sendFile(path.join(__dirname + 'login.ejs'));
//});


app.use('/', require('./router'));



app.listen(3000, ()=>{
    console.log('SERVER corriendo en http://localhost:3000');
});