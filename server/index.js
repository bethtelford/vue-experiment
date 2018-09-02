const express = require('express'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      cors = require('cors'),
      authCtrl = require('./controllers/auth_controller'),
      port = 4000;
require('dotenv').config();

const server = express();

server.use(bodyParser.json());
// setup until proxy can be figured out
server.use(cors());

massive(process.env.DB_CONNECTION_STRING)
.then(db => {
  server.set('db', db);
  server.listen(port, () => console.log(`Server running on port ${port}`));
});

server.post('/auth/register', authCtrl.register)
