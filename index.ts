import { Server } from './models/server';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;

const server = new Server({ port: PORT });

server.start();

server.configureSockets();
