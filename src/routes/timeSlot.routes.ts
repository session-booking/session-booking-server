import {Router} from "express";
import {TimeSlotController} from "../controller/timeSlot.controller";
import {APILogger} from "../logger/api.logger";
import {verifyToken} from "../middleware/verifyToken";
import {CustomRequest} from "../interface/customRequest";

const router = Router();
const timeSlotController = new TimeSlotController();
const logger = new APILogger();

router.get('/api/timeSlots/:userId', (req, res) => {
    const userId = req.params.userId
    const fromDate = req.query.from as string;
    const toDate = req.query.to as string;
    timeSlotController.getTimeSlots(userId, fromDate, toDate).then((data) => res.json(data));
});

router.post('/api/timeSlot', verifyToken, (req: CustomRequest, res) => {
    const userId = req.userId;
    let timeSlot = req.body.timeSlot;

    timeSlot.userId = userId;
    timeSlotController
        .createTimeSlot(timeSlot)
        .then((data) => res.json(data))
        .catch((error) => {
            logger.error('error::' + error, null);
            res.status(500).json({message: error.message});
        });
});

router.delete('/api/timeSlot/:id', verifyToken, (req, res) => {
    timeSlotController
        .deleteTimeSlot(req.params.id)
        .then((data) => res.json(data))
        .catch((error) => {
            logger.error('error::' + error, null);
            res.status(500).json({message: error.message});
        });
});

export default router;