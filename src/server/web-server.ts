import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import SocketServer from 'socket.io';
import uniqid from 'uniqid';

import { Player, Space } from '../types/models';
import { Broadcast, CreateSpaceRequest, SocketEvent } from '../types/api';

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

  socket.on('disconnect', () => {
    console.log(`DISCONNECT: Socket with id=${socket.id} disconnected`);
  });
});

const createSpace = (space: Space) => {
  const nsp = io.of(`/${space.id}`);
  const players: Array<Player> = [space.host];

  nsp.on('connection', function (socket) {
    console.log(
      `JOIN SPACE: Socket with id=${socket.id} joined space ${space.id}`
    );
    socket.emit(SocketEvent.Welcome, space);

    socket.on(SocketEvent.JoinGame, (name: string) => {
      console.log(
        `JOIN GAME: Player with nickname=${name} joined game in space ${space.id}`
      );
      players.push({ id: socket.id, name });
      nsp.emit(SocketEvent.NewPlayer, name, players);
    });

    socket.on(SocketEvent.BroadcastPayload, (payload: Broadcast) => {
      console.log(`BROADCAST PAYLOAD: Broadcasting ${payload.type}`);
      nsp.emit(SocketEvent.BroadcastPayload, payload);
    });
  });
};

app.post('/space/create', (request, response) => {
  const createData: CreateSpaceRequest = request.body;
  const spaceId = uniqid();
  const newSpace: Space = {
    id: spaceId,
    host: {
      id: `/${spaceId}#${createData.hostId}`,
      name: createData.hostName,
    },
  };
  createSpace(newSpace);
  console.log(
    `Player ${newSpace.host.name} created space ${newSpace.id} with hostId ${newSpace.host.id}`
  );
  response.status(201).send(newSpace);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.normalize(path.join(__dirname, '../dist/index.html')));
});
