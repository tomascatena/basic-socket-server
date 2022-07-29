"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const sockets_1 = require("./sockets");
class Server {
    constructor(serverConfig) {
        this.port = serverConfig.port;
        this.app = (0, express_1.default)();
        // http server
        this.server = http_1.default.createServer(this.app);
        // socket.io server
        this.io = new socket_io_1.default.Server(this.server, {});
    }
    middlewares() {
        this.app.use(express_1.default.static('public'));
    }
    configureSockets() {
        const sockets = new sockets_1.Sockets({ io: this.io });
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
exports.Server = Server;
