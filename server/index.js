const express = require('express'),
      bodyParser = require('body-parser'),
      massive = require('massive')
      port = 4000;
require('dotenv').config();

const server = express();

massive(process.env.DB_CONNECTION_STRING)
.then(db => {
  server.set('db', db);
  server.listen(port, () => console.log(`Server running on port ${port}`));
});


