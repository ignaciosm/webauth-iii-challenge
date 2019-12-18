const express = require('express');
const server = express();
const UsersRouter = require('./users/users-router')



server.use(express.json());
server.use('/api', UsersRouter);

module.exports = server;