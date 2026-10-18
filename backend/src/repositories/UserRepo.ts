import { AppDataSorce } from "../config/data-source";
import { User } from "../models/User";



export class UserRepo {
    private userRepository = AppDataSorce.getRepository(User);

    create(user: User) {
        this.userRepository.create(user);
        return this.userRepository.save(user);
    }

    findByEmail(email: string) {
        return this.userRepository.findOneBy({ email });
    }
}   