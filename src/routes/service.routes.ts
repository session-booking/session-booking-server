import {Router} from "express";
import {ServiceController} from "../controller/service.controller";
import {APILogger} from "../logger/api.logger";
import {verifyToken} from "../middleware/verifyToken";
import {CustomRequest} from "../interface/customRequest";

const router = Router();
const serviceController = new ServiceController();
const logger = new APILogger();

router.get('/api/services/:userId', (req, res) => {
    serviceController.getServices(req.params.userId).then((data) => res.json(data));
});

router.post('/api/service', verifyToken, (req: CustomRequest, res) => {
    const userId = req.userId;
    let service = req.body.service;

    service.userId = userId;
    serviceController
        .createService(service)
        .then((data) => res.json(data))
        .catch((error) => {
            logger.error('error::' + error, null);
            res.status(500).json({message: error.message});
        });
});

router.delete('/api/service/:id', verifyToken, (req: CustomRequest, res) => {
    serviceController
        .deleteService(req.params.id)
        .then((data) => res.json(data))
        .catch((error) => {
            logger.error('error::' + error, null);
            res.status(500).json({message: error.message});
        });
});

export default router;