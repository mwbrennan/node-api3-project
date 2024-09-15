const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const userRoute = require('./users/users-router.js');

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

// global middlewares and the user's router need to be connected here
server.use('/api/users', userRoute)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
