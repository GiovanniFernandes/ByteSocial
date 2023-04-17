const express = require('express');
const routes = require ('./routes');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const MessageSocketController = require('./controllers/MessageSocketController.js');

const app = express();
const port = process.env.SERVER_PORT || 3021
const server = http.createServer(app);

const io = new Server(server);

const messageSocketController = new MessageSocketController(io);

routes(app);

server.listen(port, ()=> {
    console.log(`API rodando na porta ${port}`);
});

module.exports = app;