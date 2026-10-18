
import { ConflictError } from "../errors";
import { UserRoles } from "../models/roles/UserRoles";
import { User } from "../models/User";
import { UserRepo } from "../repositories/UserRepo";

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
        
        const user = await userRepo.create({ 
            name, 
            email, 
            password,
            cpf,
            phone,
            address,
            addressNumber,
            postalCode,
            role
        } as User);

        return passwordHandler(user);
    }

}