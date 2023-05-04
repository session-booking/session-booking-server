import {Router} from 'express';
import {SessionController} from "../src/controller/session.controller";
import {APILogger} from "../src/logger/api.logger";
import {verifyToken} from "../src/middleware/verifyToken";
import {CustomRequest} from "../src/interface/customRequest";

const router = Router();
const sessionController = new SessionController();
const logger = new APILogger();

router.get('/api/sessions', verifyToken, (req: CustomRequest, res) => {
    const userId = req.userId;
    sessionController.getSessions(userId).then((data) => res.json(data));
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