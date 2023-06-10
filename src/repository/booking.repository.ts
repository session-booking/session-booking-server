import {APILogger} from "../logger/api.logger";
import {Booking} from "../model/booking.model";
import {connect} from "../config/db.config";
import {Op} from "sequelize";

export class BookingRepository {
    private logger: APILogger;
    private db: any = {};
    private bookingRepository: any;

    constructor() {
        this.db = connect();
        this.logger = new APILogger();
        this.bookingRepository = this.db.sequelize.getRepository(Booking)
    }

    async getBookingsByDay(userId: string, date: string) {
        try {
            const startDateString = `${date}T00:00:00.000Z`;
            const endDateString = `${date}T23:59:59.999Z`;

            const bookings = await this.bookingRepository.findAll({
                where: {
                    userId: userId,
                    date: {
                        [Op.between]: [startDateString, endDateString]
                    }
                }
            });

            this.logger.info('bookings:::', bookings);
            return bookings;
        } catch (error) {
            this.logger.error('error::' + error, null);
            return [];
        }
    }

    async createBooking(booking: Booking) {
        let data = {}
        try {
            data = await this.bookingRepository.create(booking);
        } catch (error) {
            this.logger.error('error::' + error, null);
        }
        return data;
    }

    async deleteBooking(bookingId: string) {
        let data = {}
        try {
            data = await this.bookingRepository.destroy({
                where: {
                    id: bookingId
                }
            });
        } catch (error) {
            this.logger.error('error::' + error, null);
        }
        return data;
    }

}