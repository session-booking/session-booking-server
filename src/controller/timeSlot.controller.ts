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

    async getTimeSlotsByDateInterval(userId: number, fromDate: string, toDate: string) {
        this.logger.info(`controller: getTimeSlotsByDateInterval(userId: ${userId})`,{fromDate: fromDate, toDate: toDate});
        return await this.timeSlotService.getTimeSlotsByDateInterval(userId, fromDate, toDate);
    }

    async getTimeSlotsByDay(userId: string, date: string) {
        this.logger.info(`controller: getTimeSlotsByDay(userId: ${userId})`, {date: date});
        return await this.timeSlotService.getTimeSlotsByDay(userId, date);
    }

    async createTimeSlot(timeSlot: TimeSlot) {
        this.logger.info('controller: createTimeSlot', timeSlot);
        return await this.timeSlotService.createTimeSlot(timeSlot);
    }

    async deleteTimeSlot(timeSlotId: string) {
        this.logger.info(`controller: deleteTimeSlot(timeSlotId: ${timeSlotId})`, null);
        return await this.timeSlotService.deleteTimeSlot(timeSlotId);
    }

}