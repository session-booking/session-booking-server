import {Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {CustomRequest} from "../interface/customRequest";

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({message: 'No token provided.'});
    }

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    jwt.verify(token, JWT_SECRET_KEY, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).send({message: 'Unauthorized access.'});
        }

        req.userId = Number(decoded.id);
        next();
    });
}