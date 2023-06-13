import {TimeSlotRepository} from "../repository/timeSlot.repository";
import {TimeSlot} from "../model/timeSlot.model";

export class TimeSlotService {
    private timeSlotRepository: TimeSlotRepository;

    constructor() {
        this.timeSlotRepository = new TimeSlotRepository();
    }

    async getTimeSlotsByDateInterval(userId: number, fromDate: string, toDate: string) {
        return await this.timeSlotRepository.getTimeSlotsByDateInterval(userId, fromDate, toDate);
    }

    async getTimeSlotsByDay(userId: string, date: string) {
        return await this.timeSlotRepository.getTimeSlotsByDay(userId, date);
    }

    async createTimeSlot(timeSlot: TimeSlot) {
        return await this.timeSlotRepository.createTimeSlot(timeSlot);
    }

    async deleteTimeSlot(timeSlotId: string) {
        return await this.timeSlotRepository.deleteTimeSlot(timeSlotId);
    }

}