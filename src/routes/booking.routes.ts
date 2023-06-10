import {Router} from "express";
import {BookingController} from "../controller/booking.controller";
import {APILogger} from "../logger/api.logger";

const router = Router();
const bookingController = new BookingController();
const logger = new APILogger();

router.get('/api/bookings/:userId', (req, res) => {
    const userId = req.params.userId;
    const date = req.query.date as string;
    bookingController.getBookingsByDay(userId, date).then((data) => res.json(data));
});

router.post('/api/booking', (req, res) => {
    let booking = req.body.booking;

    bookingController
        .createBooking(booking)
        .then((data) => res.json(data))
        .catch((error) => {
            logger.error('error::' + error, null);
            res.status(500).json({message: error.message});
        });
});

router.delete('/api/booking/:id', (req, res) => {
    bookingController
        .deleteBooking(req.params.id)
        .then((data) => res.json(data))
        .catch((error) => {
            logger.error('error::' + error, null);
            res.status(500).json({message: error.message});
        });
});

export default router;