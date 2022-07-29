import SocketIO from 'socket.io';

export type SocketsConfig = {
  io: SocketIO.Server;
};

export class Sockets {
  io: SocketIO.Server;

  constructor(socketsConfig: SocketsConfig) {
    this.io = socketsConfig.io;
  }

  socketsEvents() {
    this.io.on('connection', (socket) => {
      console.log('New client connected', socket.id);

      socket.on('message-to-server', ({ message }) => {
        console.log('Message received: ', message);

        this.io.emit('message-to-client', { message });
      });
    });
  }
}
