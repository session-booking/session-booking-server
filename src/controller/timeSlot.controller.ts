import {TimeSlotService} from "../service/timeSlot.service";
import {APILogger} from "../logger/api.logger";
import {TimeSlot} from "../model/timeSlot.model";

export class TimeSlotController {
    private timeSlotService: TimeSlotService;
    private logger: APILogger;

    constructor() {
        this.timeSlotService = new TimeSlotService();
        this.logger = new APILogger();
    }

    async getTimeSlots(userId: number, fromDate: string, toDate: string) {
        this.logger.info(`controller: getTimeSlots(userId: ${userId}`, {fromDate: fromDate, toDate: toDate});
        return await this.timeSlotService.getTimeSlots(userId, fromDate, toDate);
    }

    async createTimeSlot(timeSlot: TimeSlot) {
        this.logger.info('controller: createTimeSlot', timeSlot);
        return await this.timeSlotService.createTimeSlot(timeSlot);
    }

    async deleteTimeSlot(timeSlotId: string) {
        this.logger.info('controller: deleteTimeSlot', timeSlotId);
        return await this.timeSlotService.deleteTimeSlot(timeSlotId);
    }

}