import {BookingService} from "../service/booking.service";
import {APILogger} from "../logger/api.logger";

export class BookingController {
    private bookingService: BookingService;
    private logger: APILogger;

    constructor() {
        this.bookingService = new BookingService();
        this.logger = new APILogger();
    }

    async getBookingsByDay(userId: string, date: string) {
        this.logger.info(`controller: getBookingsByDay(userId: ${userId})`, {date: date});
        return await this.bookingService.getBookingsByDay(userId, date);
    }

    async createBooking(booking: any) {
        this.logger.info('controller: createBooking', booking);
        return await this.bookingService.createBooking(booking);
    }

    async deleteBooking(bookingId: string) {
        this.logger.info(`controller: deleteBooking(bookingId: ${bookingId})`, null);
        return await this.bookingService.deleteBooking(bookingId);
    }

}