import {APILogger} from "../logger/api.logger";
import {Service} from "../model/service.model";
import {connect} from "../config/db.config";

export class ServiceRepository {
    private logger: APILogger;
    private db: any = {};
    private serviceRepository: any;

    constructor() {
        this.db = connect();
        this.logger = new APILogger();
        this.serviceRepository = this.db.sequelize.getRepository(Service);
    }

    async getServices(userId: string) {
        try {
            const services = await this.serviceRepository.findAll({
                where: {
                    userId: userId
                }
            });
            this.logger.info('services:::', services);
            return services;
        } catch (error) {
            this.logger.error('error::' + error, null);
            return [];
        }
    }

    async createService(service: Service) {
        let data = {};
        try {
            data = await this.serviceRepository.create(service);
        } catch (error) {
            this.logger.error('error::' + error, null);
            throw error;
        }
        return data;
    }

    async deleteService(serviceId: string) {
        let data = {};
        try {
            data = await this.serviceRepository.destroy({
                where: {
                    id: serviceId,
                }
            });
        } catch (error) {
            this.logger.error('error::' + error, null);
            throw error;
        }
        return data;
    }

}