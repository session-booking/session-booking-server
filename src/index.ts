import * as http from 'http';
import App from "./App";
import {config} from "dotenv";
import {APILogger} from './logger/api.logger';

config();

const port = process.env.PORT || 5001;

App.set('port', port);
const server = http.createServer(App);
server.listen(port);

const logger = new APILogger();

server.on('listening', function (): void {
    const addr = server.address();
    const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
    logger.info(`Listening on ${bind}`, null);
});


// 'module.exports' is a special object in Node.js that is used for exporting values from a module so that they can be consumed by other modules. 
// It allows developers to expose their functions, objects, and values from a module and make them available for use in other parts of their application.
module.exports = App;