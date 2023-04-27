import { session } from "../model/session.model";
import { SessionRepository } from "../repository/session.repository";

export class SessionService {
    private sessionRepository: SessionRepository;

    constructor() {
        this.sessionRepository = new SessionRepository();
    }

    async getSessions() {
        return await this.sessionRepository.getSessions();
    }

    async createSession(session: session) {
        return await this.sessionRepository.createSession(session);
    }

    async updateSession(session: session) {
        return await this.sessionRepository.updateSession(session);
    }

    async deleteSession(sessionId: string) {
        return await this.sessionRepository.deleteSession(sessionId);
    }

}