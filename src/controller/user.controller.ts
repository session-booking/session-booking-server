import {UserService} from "../service/user.service";
import {APILogger} from "../logger/api.logger";
import {User} from "../model/user.model";

export class UserController {
    private userService: UserService;
    private logger: APILogger;

    constructor() {
        this.userService = new UserService();
        this.logger = new APILogger();
    }

    async register(user: User) {
        this.logger.info('controller: register', user);
        return await this.userService.register(user);
    }

    async login(user: User) {
        this.logger.info('controller: login', user);
        return await this.userService.login(user);
    }

    async getUser(userId: string) {
        this.logger.info(`controller: getUser(userId: ${userId})`, null);
        return await this.userService.getUser(userId);
    }

    async updateUser(user: User) {
        this.logger.info('controller: updateUser', user);
        return await this.userService.updateUser(user);
    }

    async deleteUser(userId: string) {
        this.logger.info(`controller: deleteUser(userId: ${userId})`, null);
        return await this.userService.deleteUser(userId);
    }

    async checkUser(userId: string) {
        this.logger.info(`controller: checkUser(userId: ${userId})`, null);
        return await this.userService.checkUser(userId);
    }

}