import { connect } from "../config/db.config";
import { APILogger } from "../logger/api.logger";
import { session } from "../model/session.model";

export class SessionRepository {
    private logger: APILogger;
    private db: any = {};
    private sessionRepository: any;

    constructor() {
        this.db = connect();
        this.logger = new APILogger();
        
        // sync() is used to synchronize your Sequelize model with your database tables
        // 'force: true' re-creates the table on sync - it is dangerous, because it will delete all of your data
        // used mostly for development purposes
        this.db.sequelize.sync({ force: true }).then(() => {
            this.logger.info('drop and re-sync db', undefined);
        });
        this.sessionRepository = this.db.sequelize.getRepository(session)
    }

    async getSessions() {
        try {
            const sessions = await this.sessionRepository.findAll();
            this.logger.info('sessions:::', sessions);
            return sessions;
        } catch (error) {
            this.logger.error('error::' + error, null);
            return [];
        }
    }

    async createSession(session: session) {
        let data = {};
        try {
            data = await this.sessionRepository.create(session);
        } catch (error) {
            this.logger.error('error::' + error, null);
        }
        return data;
    }

    async updateSession(session: session) {
        let data = {};
        try {
            data = await this.sessionRepository.update({...session}, {
                where: {
                    id: session.id,
                }
            });
        } catch (error) {
            this.logger.error('Error::' + error, null);
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
            this.logger.error('Error::' + error, null);
        }
        return data;
    }

}