import {Session} from "../model/session.model";
import {SessionRepository} from "../repository/session.repository";

export class SessionService {
    private sessionRepository: SessionRepository;

    constructor() {
        this.sessionRepository = new SessionRepository();
    }

    async getSessions(userId: number) {
        return await this.sessionRepository.getSessions(userId);
    }

    async createSession(session: Session) {
        return await this.sessionRepository.createSession(session);
    }

    async updateSession(session: Session) {
        return await this.sessionRepository.updateSession(session);
    }

    async deleteSession(sessionId: string) {
        return await this.sessionRepository.deleteSession(sessionId);
    }

}