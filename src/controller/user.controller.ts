import {UserService} from "../service/user.service";
import {APILogger} from "../logger/api.logger";

export class UserController {
    private userService: UserService;
    private logger: APILogger;

    constructor() {
        this.userService = new UserService();
        this.logger = new APILogger();
    }

    async register(user: any) {
        this.logger.info('controller: register', user);
        return await this.userService.register(user);
    }

    async login(user: any) {
        this.logger.info('controller: login', user);
        return await this.userService.login(user);
    }

    async getUser(userId: string) {
        this.logger.info('controller: getUser', userId);
        return await this.userService.getUser(userId);
    }

    async updateUser(user: any) {
        this.logger.info('controller: updateUser', user);
        return await this.userService.updateUser(user);
    }

    async deleteUser(userId: string) {
        this.logger.info('controller: deleteUser', userId);
        return await this.userService.deleteUser(userId);
    }

}