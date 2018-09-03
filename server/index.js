const express = require('express'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      cors = require('cors'),
      session = require('express-session'),
      authCtrl = require('./controllers/auth_controller'),
      userCtrl = require('./controllers/user_controller'),
      port = 4000;
require('dotenv').config();

const server = express();

server.use(bodyParser.json());
// setup until proxy can be figured out
server.use(cors());
server.use(session({
  secret: 'faslkjouiewfjdsoieru890y7u439085urtegfiod90c8v7fgyirtuh4j3es',
  resave: false, 
  saveUninitialized: false
}))

massive(process.env.DB_CONNECTION_STRING)
.then(db => {
  server.set('db', db);
  server.listen(port, () => console.log(`Server running on port ${port}`));
});

server.post('/auth/register', authCtrl.register);

server.post('/auth/login', authCtrl.login);

server.get('/api/user', userCtrl.checkUser);

server.get('/api/users', userCtrl.fetchUsers);