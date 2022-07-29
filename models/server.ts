import express, { Express } from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import path from 'path';
import { Sockets } from './sockets';

export type ServerConfig = {
  port: number | string;
};

export class Server {
  port: number | string;
  app: Express;
  server: http.Server;
  io: SocketIO.Server;

  constructor(serverConfig: ServerConfig) {
    this.port = serverConfig.port;
    this.app = express();

    // http server
    this.server = http.createServer(this.app);

    // socket.io server
    this.io = new SocketIO.Server(this.server, {});
  }

  middlewares() {
    this.app.use(express.static('public'));
  }

  configureSockets() {
    const sockets = new Sockets({ io: this.io });

    sockets.socketsEvents();
  }

  start() {
    // Initialize middlewares
    this.middlewares();

    // Start listening for connections
    this.server.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
