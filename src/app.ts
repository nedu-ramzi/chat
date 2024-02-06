import http from 'http';
import express from 'express';
import path from 'path';
import { config } from './app/config/config.main';
import { io } from './app/services/socketio.services';

//set up server
const app = express();
const server = http.createServer(app);

// set static folder
app.use(express.static(path.join(__dirname, 'public')));
io.attach(server);

server.listen(config.server.port, () => {
    console.log(`Server up on port: ${config.server.port}`);
})