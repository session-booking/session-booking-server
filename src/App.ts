import * as bodyParser from "body-parser";
import {SessionController} from "./controller/session.controller";
import {APILogger} from "./logger/api.logger";
import {config} from "dotenv";
import {Application} from "express";

const cors = require("cors");
const express = require("express");

(() => {
    config();
})();

import "./sync/db.sync";
import {UserController} from "./controller/user.controller";

class App {

    public express: Application;
    public logger: APILogger;
    public sessionController: SessionController;
    public userController: UserController;

    constructor() {
        this.express = express();

        this.middleware();

        this.sessionRoutes();
        this.userRoutes();
        this.loggerRoutes();

        this.logger = new APILogger();
        this.sessionController = new SessionController();
        this.userController = new UserController();
    }

    private middleware(): void {
        this.express.use(cors({origin: "*"}));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    private sessionRoutes(): void {
        this.express.get("/api/sessions", (req, res) => {
            this.sessionController.getSessions().then((data) => res.json(data));
        });

        this.express.post("/api/session", (req, res) => {
            this.sessionController
                .createSession(req.body.session)
                .then((data) => res.json(data))
                .catch((error) => {
                    this.logger.error("error::" + error, null);
                    res.status(500).json({message: error.message});
                });
        });

        this.express.put("/api/session", (req, res) => {
            this.sessionController
                .updateSession(req.body.session)
                .then((data) => res.json(data))
                .catch((error) => {
                    this.logger.error("error::" + error, null);
                    res.status(500).json({message: error.message});
                });
        });

        this.express.delete("/api/session/:id", (req, res) => {
            this.sessionController
                .deleteSession(req.params.id)
                .then((data) => res.json(data))
                .catch((error) => {
                    this.logger.error("error::" + error, null);
                    res.status(500).json({message: error.message});
                });
        });
    }

    private userRoutes(): void {
        this.express.post("/api/user/register", (req, res) => {
            this.userController
                .register(req.body.user)
                .then(
                    (data) =>
                        (data.hasOwnProperty("httpCode"))
                        ? res.status(data.httpCode).json(data)
                        : res.json(data)
                )
                .catch((error) => {
                    this.logger.error("error::" + error, null);
                    res.status(500).json({message: error.message});
                });
        });

        this.express.post("/api/user/login", (req, res) => {
            this.userController
                .login(req.body.user)
                .then(
                    (data) =>
                        (data.hasOwnProperty("httpCode"))
                        ? res.status(data.httpCode).json(data)
                        : res.json(data)
                )
                .catch((error) => {
                    this.logger.error("error::" + error, null);
                    res.status(500).json({message: error.message});
                });
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

}

export default new App().express;
