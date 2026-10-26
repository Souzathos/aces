
import { ConflictError } from "../errors";
import { UserRoles } from "../models/roles/UserRoles";
import { User } from "../models/User";
import { UserRepo } from "../repositories/UserRepo";
import { hashPassword } from "../utils/PasswordUtils";

type userDTO = { 
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

const userRepo = new UserRepo();

function passwordHandler(user: User): User {
     
    delete (user as any).password;
    return user
}

export class UserService {
    async createUser({ name, email, password, cpf, phone, address, addressNumber, postalCode, role }: userDTO) {
        
        const userExists = await userRepo.findByEmail(email);

        if (userExists) {
            throw new ConflictError("User already exists");
        }

        const hashedPassword = await hashPassword(password);
        
        const user = await userRepo.create({ 
            name, 
            email, 
            password: hashedPassword,
            cpf,
            phone,
            address,
            addressNumber,
            postalCode,
            role
        } as User);

        return passwordHandler(user);
    }

    async update(id: number, userData: Partial<userDTO>) {
        const userExists = await userRepo.findById(id);

        if(!userExists) {
            throw new NotFoundError("User not found");
        }

        const newUser = await userRepo.update(id, userData) 

        return passwordHandler(newUser as any);
    }

}