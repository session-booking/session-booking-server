import {APILogger} from "../logger/api.logger";
import {TimeSlot} from "../model/timeSlot.model";
import {connect} from "../config/db.config";
import {Op} from "sequelize";

export class TimeSlotRepository {
    private logger: APILogger;
    private db: any = {};
    private timeSlotRepository: any;

    constructor() {
        this.db = connect();
        this.logger = new APILogger();
        this.timeSlotRepository = this.db.sequelize.getRepository(TimeSlot);
    }

    async getTimeSlotsByDateInterval(userId: number, fromDate: string, toDate: string) {
        try {
            const from = new Date(fromDate);
            const to = new Date(toDate);

            const timeSlots = await this.timeSlotRepository.findAll({
                where: {
                    userId: userId,
                    date: {
                        [Op.between]: [from, to]
                    }
                }
            });

            this.logger.info('timeSlots:::', timeSlots);
            return timeSlots;
        } catch (error) {
            this.logger.error('error::' + error, null);
            return [];
        }
    }

    async getTimeSlotsByDay(userId: string, date: string) {
        try {
            const startDateString = `${date}T00:00:00.000Z`;
            const endDateString = `${date}T23:59:59.999Z`;

            const timeSlots = await this.timeSlotRepository.findAll({
                where: {
                    userId: userId,
                    date: {
                        [Op.between]: [startDateString, endDateString]
                    }
                }
            });

            this.logger.info('timeSlots:::', timeSlots);
            return timeSlots;
        } catch (error) {
            this.logger.error('error::' + error, null);
            return [];
        }
    }

    async createTimeSlot(timeSlot: TimeSlot) {
        let data = {};
        try {
            data = await this.timeSlotRepository.create(timeSlot);
        } catch (error) {
            this.logger.error('error::' + error, null);
        }
        return data;
    }

    async deleteTimeSlot(timeSlotId: string) {
        let data = {};
        try {
            data = await this.timeSlotRepository.destroy({
                where: {
                    id: timeSlotId,
                }
            });
        } catch (error) {
            this.logger.error('error::' + error, null);
        }
        return data;
    }

}