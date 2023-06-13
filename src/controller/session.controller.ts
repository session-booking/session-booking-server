import {APILogger} from "../logger/api.logger";
import {Session} from "../model/session.model";
import {SessionService} from "../service/session.service";

export class SessionController {
    private sessionService: SessionService;
    private logger: APILogger;

    constructor() {
        this.sessionService = new SessionService();
        this.logger = new APILogger();
    }

    async getSessionsByDateInterval(userId: number, fromDate: string, toDate: string) {
        this.logger.info(`controller: getSessionsByDateInterval(userId: ${userId})`, {fromDate: fromDate, toDate: toDate});
        return await this.sessionService.getSessionsByDateInterval(userId, fromDate, toDate);
    }

    async getSessionsByDay(userId: string, date: string) {
        this.logger.info(`controller: getSessionsByDay(userId: ${userId})`, {date: date});
        return await this.sessionService.getSessionsByDay(userId, date);
    }

    async createSession(session: Session) {
        this.logger.info('controller: createSession', session);
        return await this.sessionService.createSession(session);
    }

    async updateSession(session: Session) {
        this.logger.info('controller: updateSession', session);
        return await this.sessionService.updateSession(session);
    }

    async deleteSession(sessionId: string) {
        this.logger.info(`controller: deleteSession(sessionId: ${sessionId})`, null);
        return await this.sessionService.deleteSession(sessionId);
    }

}