import * as bodyParser from "body-parser";
import {SessionController} from "./controller/session.controller";
import {APILogger} from "./logger/api.logger";
import {config} from "dotenv";
import * as path from "path";
import {Application} from "express";

const cors = require("cors");
const express = require("express");

class App {
    public express: Application;
    public logger: APILogger;
    public sessionController: SessionController;

    constructor() {
        config();
        this.express = express();

        this.middleware();

        this.sessionRoutes();
        this.loggerRoutes();
        this.catchAllRoute();

        this.logger = new APILogger();
        this.sessionController = new SessionController();
    }

    private middleware(): void {
        this.express.use(cors({origin: "*"}));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));

        // Serve static React files
        this.express.use(express.static(path.join(__dirname, '../../client/dist')));
    }

    private sessionRoutes(): void {
        this.express.get("/api/sessions", (req, res) => {
            this.sessionController.getSessions().then((data) => res.json(data));
        });

        this.express.post("/api/session", (req, res) => {
            this.sessionController
                .createSession(req.body.session)
                .then((data) => res.json(data));
        });

        this.express.put("/api/session", (req, res) => {
            this.sessionController
                .updateSession(req.body.session)
                .then((data) => res.json(data));
        });

        this.express.delete("/api/session/:id", (req, res) => {
            this.sessionController
                .deleteSession(req.params.id)
                .then((data) => res.json(data));
        });
    }

    private loggerRoutes(): void {
        this.express.post("/api/logger/info", (req, res) => {
            this.logger.info(req.body.message, req.body.data);
            res.json({message: "success"});
        });

        this.express.post("/api/logger/warn", (req, res) => {
            this.logger.warn(req.body.message, req.body.data);
            res.json({message: "success"});
        });

        this.express.post("/api/logger/error", (req, res) => {
            this.logger.error(req.body.message, req.body.data);
            res.json({message: "success"});
        });
    }

    private catchAllRoute(): void {
        this.express.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
        });
    }

}

export default new App().express;
