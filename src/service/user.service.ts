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

    async updateUser(user: User) {
        return await this.userRepository.updateUser(user);
    }

    async deleteUser(userId: string) {
        return await this.userRepository.deleteUser(userId);
    }

}