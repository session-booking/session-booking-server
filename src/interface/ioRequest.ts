import {Server as IOServer} from 'socket.io';
import {Request} from 'express';

export interface IoRequest extends Request {
    io: IOServer;
}