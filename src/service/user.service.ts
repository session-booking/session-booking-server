import {UserRepository} from "../repository/user.repository";
import {User} from "../model/user.model";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(user: User) {
        return await this.userRepository.register(user);
    }

    async login(user: User) {
        return await this.userRepository.login(user);
    }

    async getUser(userId: string) {
        return await this.userRepository.getUser(userId);
    }

    async updateUser(user: any) {
        return await this.userRepository.updateUser(user);
    }

    async deleteUser(userId: number) {
        return await this.userRepository.deleteUser(userId);
    }

    async checkUser(userId: string) {
        return await this.userRepository.checkUser(userId);
    }

}