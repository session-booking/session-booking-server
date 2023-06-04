import {APILogger} from "../logger/api.logger";
import {connect} from "../config/db.config";
import {User} from "../model/user.model";

const jwt = require('jsonwebtoken');

export class UserRepository {
    private logger: APILogger;
    private db: any = {};
    private userRepository: any;

    constructor() {
        this.db = connect();
        this.logger = new APILogger();
        this.userRepository = this.db.sequelize.getRepository(User);
    }

    async register(user: User) {
        try {
            const existingUser = await this.userRepository.findOne({
                where: {
                    email: user.email,
                }
            });

            if (existingUser) {
                return {
                    message: 'user already exists',
                    httpCode: 409,
                };
            }

            const newUser = await this.userRepository.create(user);

            if (newUser && newUser.id) {
                return {
                    message: 'registration successful',
                    httpCode: 200,
                };
            } else {
                return {
                    message: 'registration failed',
                    httpCode: 500,
                };
            }
        } catch (error) {
            this.logger.error('error::' + error, null);
            throw error;
        }
    }

    async login(user: User) {
        try {
            const existingUser = await this.userRepository.findOne({
                where: {
                    email: user.email,
                }
            });

            if (!existingUser) {
                return {
                    message: 'user not found',
                    httpCode: 404,
                };
            }

            if (existingUser.password !== user.password) {
                return {
                    message: 'invalid password',
                    httpCode: 401,
                };
            }

            const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
            const payload = {
                id: existingUser.id,
            }

            return {
                message: 'login successful',
                httpCode: 200,
                user: {
                    id: existingUser.id,
                    username: existingUser.username,
                    email: existingUser.email,
                    phoneNumber: existingUser.phoneNumber,
                },
                token: jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: '30d'}),
            }
        } catch (error) {
            this.logger.error('error::' + error, null);
            throw error;
        }
    }

    async getUser(userId: string) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id: userId,
                }
            });

            if (!user) {
                return {
                    message: 'user not found',
                    httpCode: 404,
                };
            }

            return {
                message: 'user exists',
                httpCode: 200,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                }
            }
        } catch (error) {
            this.logger.error('error::' + error, null);
            throw error;
        }
    }

    async updateUser(user: User) {
        let data = {};
        try {
            data = await this.userRepository.update({...user}, {
                where: {
                    id: user.id,
                }
            });
        } catch (error) {
            this.logger.error('error::' + error, null);
            throw error;
        }
        return data;
    }

    async deleteUser(userId: string) {
        let data = {};
        try {
            data = await this.userRepository.destroy({
                where: {
                    id: userId,
                }
            });
        } catch (error) {
            this.logger.error('error::' + error, null);
            throw error;
        }
        return data;
    }

    async checkUser(userId: string) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id: userId,
                }
            });

            if (!user) {
                return {
                    message: 'user not found',
                    httpCode: 404,
                };
            }

            return {
                message: 'user exists',
                httpCode: 200,
            }
        } catch (error) {
            this.logger.error('error::' + error, null);
            throw error;
        }
    }

}