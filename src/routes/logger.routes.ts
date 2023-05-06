import {Router} from 'express';
import {APILogger} from "../logger/api.logger";

const router = Router();
const logger = new APILogger();

router.post('/api/logger/info', (req, res) => {
    logger.info(req.body.message, req.body.data);
    res.json({message: 'success'});
});

router.post('/api/logger/warn', (req, res) => {
    logger.warn(req.body.message, req.body.data);
    res.json({message: 'success'});
});

router.post('/api/logger/error', (req, res) => {
    logger.error(req.body.message, req.body.data);
    res.json({message: 'success'});
});

export default router;