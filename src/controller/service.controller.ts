import {ServiceService} from "../service/service.service";
import {APILogger} from "../logger/api.logger";
import {Service} from "../model/service.model";

export class ServiceController {
    private serviceService: ServiceService;
    private logger: APILogger;

    constructor() {
        this.serviceService = new ServiceService();
        this.logger = new APILogger();
    }

    async getServices(userId: string) {
        this.logger.info(`controller: getServices(userId: ${userId})`, null);
        return await this.serviceService.getServices(userId);
    }

    async createService(service: Service) {
        this.logger.info('controller: createService', service);
        return await this.serviceService.createService(service);
    }

    async deleteService(serviceId: string) {
        this.logger.info(`controller: deleteService(serviceId: ${serviceId})`, null);
        return await this.serviceService.deleteService(serviceId);
    }

}