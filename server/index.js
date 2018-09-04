const express = require('express'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      cors = require('cors'),
      session = require('express-session'),
      authCtrl = require('./controllers/auth_controller'),
      userCtrl = require('./controllers/user_controller'),
      port = 4000;
require('dotenv').config();
const { DB_CONNECTION_STRING, SESSION_SECRET } = process.env;

const server = express();

server.use(bodyParser.json());
server.use(session({
  secret: SESSION_SECRET,
  resave: false, 
  saveUninitialized: false
}))

massive(DB_CONNECTION_STRING)
.then(db => {
  server.set('db', db);
  server.listen(port, () => console.log(`Server running on port ${port}`));
});

server.post('/auth/register', authCtrl.register);

server.post('/auth/login', authCtrl.login);

server.post('/auth/logout', authCtrl.logout);

server.get('/api/user', userCtrl.checkUser);

server.get('/api/users', userCtrl.fetchUsers);