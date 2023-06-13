import {Router} from 'express';
import {SessionController} from "../controller/session.controller";
import {APILogger} from "../logger/api.logger";
import {verifyToken} from "../middleware/verifyToken";
import {CustomRequest} from "../interface/customRequest";

const router = Router();
const sessionController = new SessionController();
const logger = new APILogger();

router.get('/api/sessions/interval', verifyToken, (req: CustomRequest, res) => {
    const userId = req.userId;
    const fromDate = req.query.from as string;
    const toDate = req.query.to as string;
    sessionController.getSessionsByDateInterval(userId, fromDate, toDate).then((data) => res.json(data));
});

router.get('/api/sessions/day/:userId', (req, res) => {
    const userId = req.params.userId;
    const date = req.query.date as string;
    sessionController.getSessionsByDay(userId, date).then((data) => res.json(data));
});

router.post('/api/session', verifyToken, (req: CustomRequest, res) => {
    const userId = req.userId;
    let session = req.body.session;

    session.userId = userId;
    sessionController
        .createSession(session)
        .then((data) => res.json(data))
        .catch((error) => {
            logger.error('error::' + error, null);
            res.status(500).json({message: error.message});
        });
});

router.put('/api/session', verifyToken, (req, res) => {
    sessionController
        .updateSession(req.body.session)
        .then((data) => res.json(data))
        .catch((error) => {
            logger.error('error::' + error, null);
            res.status(500).json({message: error.message});
        });
});

router.delete('/api/session/:id', verifyToken, (req, res) => {
    sessionController
        .deleteSession(req.params.id)
        .then((data) => res.json(data))
        .catch((error) => {
            logger.error('error::' + error, null);
            res.status(500).json({message: error.message});
        });
});

export default router;