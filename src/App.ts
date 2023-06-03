import * as bodyParser from "body-parser";
import {config} from "dotenv";
import {Application} from "express";

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

class App {
    public express: Application;

    constructor() {
        this.express = express();
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
    }

}

export default new App().express;
