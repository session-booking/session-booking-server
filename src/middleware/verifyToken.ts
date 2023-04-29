import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({message: 'No token provided.'});
    }

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    jwt.verify(token, JWT_SECRET_KEY, (err: any) => {
        if (err) {
            return res.status(401).send({message: 'Unauthorized access.'});
        }
        next();
    });
}