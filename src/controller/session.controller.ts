import { APILogger } from "../logger/api.logger";
import { session } from "../model/session.model";
import { SessionService } from "../service/session.service";

export class SessionController {
    private sessionService: SessionService;
    private logger: APILogger;

    constructor() {
        this.sessionService = new SessionService();
        this.logger = new APILogger();
    }

    async getSessions() {
        this.logger.info('controller: getSessions', null)
        return await this.sessionService.getSessions();
    }

    async createSession(session: session) {
        this.logger.info('controller: createSession', session);
        return await this.sessionService.createSession(session);
    }

    async updateSession(session: session) {
        this.logger.info('controller: updateSession', session);
        return await this.sessionService.updateSession(session);
    }

    async deleteSession(sessionId: string) {
        this.logger.info('controller: deleteSession', sessionId);
        return await this.sessionService.deleteSession(sessionId);
    }
    
}