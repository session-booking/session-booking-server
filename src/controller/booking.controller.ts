import {BookingService} from "../service/booking.service";
import {APILogger} from "../logger/api.logger";
import {Booking} from "../model/booking.model";

export class BookingController {
    private bookingService: BookingService;
    private logger: APILogger;

    constructor() {
        this.bookingService = new BookingService();
        this.logger = new APILogger();
    }

    async getAllUserBookings(userId: number) {
        this.logger.info(`controller: getAllUserBookings(userId: ${userId})`, null);
        return await this.bookingService.getAllUserBookings(userId);
    }

    async getBookingsByDay(userId: string, date: string) {
        this.logger.info(`controller: getBookingsByDay(userId: ${userId})`, {date: date});
        return await this.bookingService.getBookingsByDay(userId, date);
    }

    async updateBooking(booking: Booking) {
        this.logger.info('controller: updateBooking', booking);
        return await this.bookingService.updateBooking(booking);
    }

    async createBooking(booking: Booking) {
        this.logger.info('controller: createBooking', booking);
        return await this.bookingService.createBooking(booking);
    }

    async deleteBooking(bookingId: string) {
        this.logger.info(`controller: deleteBooking(bookingId: ${bookingId})`, null);
        return await this.bookingService.deleteBooking(bookingId);
    }

}