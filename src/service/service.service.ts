import {ServiceRepository} from "../repository/service.repository";
import {Service} from "../model/service.model";

export class ServiceService {
    private serviceRepository: ServiceRepository;

    constructor() {
        this.serviceRepository = new ServiceRepository();
    }

    async getServices(userId: string) {
        return await this.serviceRepository.getServices(userId);
    }

    async createService(service: Service) {
        return await this.serviceRepository.createService(service);
    }

    async deleteService(serviceId: string) {
        return await this.serviceRepository.deleteService(serviceId);
    }

}