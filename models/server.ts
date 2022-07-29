import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import path from 'path';
import { Sockets } from './sockets';

export type ServerConfig = {
  port: number | string;
  publicPath?: string;
};

export class Server {
  port: number | string;
  app: express.Application;
  server: http.Server;
  io: SocketIO.Server;
  publicPath: string;

  constructor(serverConfig: ServerConfig) {
    this.port = serverConfig.port;
    this.publicPath = serverConfig.publicPath || path.resolve(__dirname, '../public');
    this.app = express();

    // http server
    this.server = http.createServer(this.app);

    // socket.io server
    this.io = new SocketIO.Server(this.server, {});
  }

  middlewares() {
    this.app.use(express.static(this.publicPath));
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
