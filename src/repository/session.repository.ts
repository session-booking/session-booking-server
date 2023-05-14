import {connect} from "../config/db.config";
import {APILogger} from "../logger/api.logger";
import {Session} from "../model/session.model";
import {Op} from "sequelize";

export class SessionRepository {
    private logger: APILogger;
    private db: any = {};
    private sessionRepository: any;

    constructor() {
        this.db = connect();
        this.logger = new APILogger();
        this.sessionRepository = this.db.sequelize.getRepository(Session)
    }

    async getSessions(userId: number, fromDate: string, toDate: string) {
        try {
            const from = new Date(fromDate);
            const to = new Date(toDate);

            const sessions = await this.sessionRepository.findAll({
                where: {
                    userId: userId,
                    date: {
                        [Op.between]: [from, to]
                    }
                }
            });
            this.logger.info('sessions:::', sessions);
            return sessions;
        } catch (error) {
            this.logger.error('error::' + error, null);
            return [];
        }
    }

    async createSession(session: Session) {
        let data = {};
        try {
            data = await this.sessionRepository.create(session);
        } catch (error) {
            this.logger.error('error::' + error, null);
            throw error;
        }
        return data;
    }

    async updateSession(session: Session) {
        let data = {};
        try {
            data = await this.sessionRepository.update({...session}, {
                where: {
                    id: session.id,
                }
            });
        } catch (error) {
            this.logger.error('error::' + error, null);
            throw error;
        }
        return data;
    }

    async deleteSession(sessionId: string) {
        let data = {};
        try {
            data = await this.sessionRepository.destroy({
                where: {
                    id: sessionId,
                }
            });
        } catch (error) {
            this.logger.error('error::' + error, null);
            throw error;
        }
        return data;
    }

}