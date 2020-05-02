import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import SocketServer from 'socket.io';
import { SocketEvent } from '../types/enums';

const app = express();
const port = process.env.PORT || 5555;
const server = app.listen(port);
console.log(`Listening on ${port}`);
const io = SocketServer(server);
//Parse request body to json
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.normalize(path.join(__dirname, '../dist/'))));

//socket.io
io.on('connection', (socket) => {
  console.log(`CONNECT: Socket with id=${socket.id} connected`);
  socket.emit(SocketEvent.Welcome, 'Welcome kiddo');
  socket.broadcast.emit(SocketEvent.NewPlayer, 'A new challenger has arrived');

  socket.on(SocketEvent.ChatMessage, (message: string) => {
    io.emit(SocketEvent.ChatMessage, message);
  });

  socket.on('disconnect', () => {
    console.log(`DISCONNECT: Socket with id=${socket.id} disconnected`);
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.normalize(path.join(__dirname, '../dist/index.html')));
});
