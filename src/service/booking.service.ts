import {BookingRepository} from "../repository/booking.repository";
import {Booking} from "../model/booking.model";

export class BookingService {
    private bookingRepository: BookingRepository;

    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async getAllUserBookings(userId: number) {
        return await this.bookingRepository.getAllUserBookings(userId);
    }

    async getBookingsByDay(userId: string, date: string) {
        return await this.bookingRepository.getBookingsByDay(userId, date);
    }

    async updateBooking(booking: Booking) {
        return await this.bookingRepository.updateBooking(booking);
    }

    async createBooking(booking: Booking) {
        return await this.bookingRepository.createBooking(booking);
    }

    async deleteBooking(bookingId: string) {
        return await this.bookingRepository.deleteBooking(bookingId);
    }

}