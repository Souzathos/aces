import { AppDataSorce } from "../config/data-source";
import { User } from "../models/User";



export class UserRepo {
    private userRepository = AppDataSorce.getRepository(User);

    create(user: User) {
        this.userRepository.create(user);
        return this.userRepository.save(user);
    }

    update(id: number, userData: Partial<User>) {
        return this.userRepository.update(id, userData);
    }

    delete(id: string) {
        this.userRepository.delete(id);
    }

    listAll() {
        return this.userRepository.find();
    }

    findByEmail(email: string) {
        return this.userRepository.findOneBy({ email });
    }

    findById(id: number) {
        return this.userRepository.findOneBy({ id })
    }
}   