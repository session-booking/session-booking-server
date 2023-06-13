import {Response, Router} from "express";
import {BookingController} from "../controller/booking.controller";
import {APILogger} from "../logger/api.logger";
import {Booking} from "../model/booking.model";
import {IoRequest} from "../interface/ioRequest";
import {CustomRequest} from "../interface/customRequest";
import {verifyToken} from "../middleware/verifyToken";

const router = Router();
const bookingController = new BookingController();
const logger = new APILogger();

router.get('/api/bookings', verifyToken, (req: CustomRequest, res: Response) => {
    const userId = req.userId;
    bookingController.getAllUserBookings(userId).then((data) => res.json(data));
});

router.get('/api/bookings/day/:userId', (req, res) => {
    const userId = req.params.userId;
    const date = req.query.date as string;
    bookingController.getBookingsByDay(userId, date).then((data) => res.json(data));
});

router.put('/api/booking', verifyToken, (req: CustomRequest, res) => {
    const booking = req.body.booking;
    bookingController.updateBooking(booking).then((data) => res.json(data));
});

router.post('/api/booking', (req: IoRequest, res: Response) => {
    let booking = req.body.booking;
    const io = req.io;

    bookingController
        .createBooking(booking)
        .then((data) => {
            if (data instanceof Booking) {
                io.emit(`booking-update-${data.userId}`, data);
            }
            res.json(data);
        })
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