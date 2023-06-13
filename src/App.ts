import * as bodyParser from "body-parser";
import {config} from "dotenv";
import {Application} from "express";
import {Server} from 'http';
import {Server as IOServer} from 'socket.io';

const cors = require("cors");
const express = require("express");

(() => {
    config();
})();

import "./sync/db.sync";

import sessionRoutes from "./routes/session.routes";
import userRoutes from "./routes/user.routes";
import loggerRoutes from "./routes/logger.routes";
import timeSlotRoutes from "./routes/timeSlot.routes";
import serviceRoutes from "./routes/service.routes";
import bookingRoutes from "./routes/booking.routes";
import {IoRequest} from "./interface/ioRequest";

class App {
    public express: Application;
    public server: Server;
    public io: IOServer;

    constructor() {
        this.express = express();
        this.server = new Server(this.express);

        this.io = new IOServer(this.server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });

        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(cors({origin: "*"}));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    private routes(): void {
        this.express.use(sessionRoutes);
        this.express.use(userRoutes);
        this.express.use(loggerRoutes);
        this.express.use(timeSlotRoutes);
        this.express.use(serviceRoutes);

        this.express.use((req: IoRequest, res, next) => {
            req.io = this.io;
            next();
        });

        this.express.use(bookingRoutes);
    }

}

export default new App().server;
