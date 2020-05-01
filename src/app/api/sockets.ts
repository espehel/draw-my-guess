import io from 'socket.io-client';
import Socket = SocketIOClient.Socket;
import { SocketEvent } from '../../types/enums';

let socket: Socket;

export const setupConnection = () => {
  socket = io();
  socket.on('connect', () => {
    console.log(`Socket connected with id=${socket.id}`);
  });
  socket.on('connect_error', (err: any) => {
    console.log('Socket connection failed');
    console.log({ err });
  });
  socket.on('connect_timeout', (err: any) => {
    console.log('Socket connection timed out');
    console.log({ err });
  });
  socket.on(SocketEvent.Welcome, (message: string) => {
    console.log(`${SocketEvent.Welcome}: ${message}`);
  });
  socket.on(SocketEvent.NewPlayer, (message: string) => {
    console.log(`${SocketEvent.NewPlayer}: ${message}`);
  });
};
