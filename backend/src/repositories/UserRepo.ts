import { AppDataSorce } from "../config/data-source";
import { UserRoles } from "../enums/UserRoles";
import { User } from "../models/User";

export type userDTO = { 
  cpf: string,
  name: string,
  email: string,
  password: string,
  phone: string | null,
  address: string | null,
  addressNumber: string | null,
  postalCode: string | null,
  role: UserRoles;
};

export class UserRepo {
    private userRepository = AppDataSorce.getRepository(User);

    create(user: User) {
        this.userRepository.create(user);
        return this.userRepository.save(user);
    }

    async update(id: number, userData: Partial<User>): Promise<User | null> {
        await this.userRepository.update(id, userData);
        return this.findById(id);
    }

    delete(id: number) {
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

    findByCpf(cpf: string) {
        return this.userRepository.findOneBy({ cpf });
    }
}   