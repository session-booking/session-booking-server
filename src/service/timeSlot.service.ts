import {TimeSlotRepository} from "../repository/timeSlot.repository";
import {TimeSlot} from "../model/timeSlot.model";

export class TimeSlotService {
    private timeSlotRepository: TimeSlotRepository;

    constructor() {
        this.timeSlotRepository = new TimeSlotRepository();
    }

    async getTimeSlots(userId: number, fromDate: string, toDate: string) {
        return await this.timeSlotRepository.getTimeSlots(userId, fromDate, toDate);
    }

    async createTimeSlot(timeSlot: TimeSlot) {
        return await this.timeSlotRepository.createTimeSlot(timeSlot);
    }

    async deleteTimeSlot(timeSlotId: string) {
        return await this.timeSlotRepository.deleteTimeSlot(timeSlotId);
    }

}