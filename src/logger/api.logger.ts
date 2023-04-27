import * as winston from 'winston';

const { createLogger, transports } = winston;

export class APILogger {
    private logger: winston.Logger;

    constructor() {
        this.logger = createLogger({
            transports: [
                new (transports.Console)(),
                new (transports.File)({ filename: './src/logger/combined.log' }),
            ]
        });
    }

    info(message: any, data: any) {
        const dataText = (data !== null) ? `${JSON.stringify(data)}` : '';
        this.logger.info(`${message}` + dataText);
    }

    warn(message: any, data: any) {
        const dataText = (data !== null) ? `${JSON.stringify(data)}` : '';
        this.logger.warn(`${message}` + dataText);
    }

    error(message: any, data: any) {
        const dataText = (data !== null) ? `${JSON.stringify(data)}` : '';
        this.logger.error(`${message}` + dataText);
    }

}