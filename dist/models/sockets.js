"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sockets = void 0;
class Sockets {
    constructor(socketsConfig) {
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
exports.Sockets = Sockets;
