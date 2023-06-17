import {Router} from 'express';
import jwt from 'jsonwebtoken';
import {UserController} from "../controller/user.controller";
import {APILogger} from "../logger/api.logger";
import {CustomRequest} from "../interface/customRequest";
import {verifyToken} from "../middleware/verifyToken";

const router = Router();
const userController = new UserController();
const logger = new APILogger();

router.post('/api/user/register', (req, res) => {
    userController
        .register(req.body.user)
        .then(
            (data) =>
                data.hasOwnProperty('httpCode')
                    ? res.status(data.httpCode).json(data)
                    : res.json(data)
        )
        .catch((error) => {
            logger.error('error::' + error, null);
            res.status(500).json({message: error.message});
        });
});

router.post('/api/user/login', (req, res) => {
    userController
        .login(req.body.user)
        .then(
            (data) =>
                data.hasOwnProperty('httpCode')
                    ? res.status(data.httpCode).json(data)
                    : res.json(data)
        )
        .catch((error) => {
            logger.error('error::' + error, null);
            res.status(500).json({message: error.message});
        });
});

router.get('/api/user', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({
            message: 'no token provided',
            httpCode: 403,
        });
    }

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    jwt.verify(token, JWT_SECRET_KEY, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).send({
                message: 'unauthorized access',
                httpCode: 401,
            });
        }

        userController
            .getUser(decoded.id)
            .then(
                (data) =>
                    data.hasOwnProperty('httpCode')
                        ? res.status(data.httpCode).json(data)
                        : res.json(data)
            )
            .catch((error) => {
                logger.error('error::' + error, null);
                res.status(500).json({message: error.message});
            });
    });
});

router.put('/api/user', verifyToken, (req: CustomRequest, res) => {
    const userId = req.userId;
    let userData = req.body.userData;

    userData.id = userId;
    userController
        .updateUser(userData)
        .then((data) => res.json(data))
        .catch((error) => {
            logger.error('error::' + error, null);
            res.status(500).json({message: error.message});
        });
});

router.delete('/api/user', verifyToken, (req: CustomRequest, res) => {
    userController
        .deleteUser(req.userId)
        .then((data) => res.json(data))
        .catch((error) => {
            logger.error('error::' + error, null);
            res.status(500).json({message: error.message});
        });
});

router.get('/api/user/:userId', (req, res) => {
    userController
        .checkUser(req.params.userId)
        .then(
            (data) =>
                data.hasOwnProperty('httpCode')
                    ? res.status(data.httpCode).json(data)
                    : res.json(data)
        )
        .catch((error) => {
            logger.error('error::' + error, null);
            res.status(500).json({message: error.message});
        });
});

export default router;