
import { ConflictError, NotFoundError } from "../errors";
import { UserRoles } from "../enums/UserRoles";
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

export type UpdateUserData = Partial<Omit<userDTO, "role">>;

function passwordHandler({ password: _password, ...user }: User): Omit<User, "password"> {
    return user;
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

    async update(id: number, userData: UpdateUserData) {
        const userExists = await userRepo.findById(id);

        if(!userExists) {
            throw new NotFoundError("User not found");
        }

        if (userData.email !== undefined && userData.email !== userExists.email) {
            const emailExists = await userRepo.findByEmail(userData.email);

            if (emailExists) {
                throw new ConflictError("User already exists");
            }
        }

        const dataToUpdate = { ...userData };
        if (dataToUpdate.password !== undefined) {
            dataToUpdate.password = await hashPassword(dataToUpdate.password);
        }

        const updatedUser = await userRepo.update(id, dataToUpdate);

        if (!updatedUser) {
            throw new NotFoundError("User not found");
        }

        return passwordHandler(updatedUser);
    }

    async delete(id: number) {
        const userExists = await userRepo.findById(id);

        if(!userExists) {
            throw new NotFoundError("User not found");
        }

        await userRepo.delete(id);
    }

    async listAll() {

        const users = await userRepo.listAll();

        return users.map((user) => passwordHandler(user));
    }

    async listById(id: number) {

        const user = await userRepo.findById(id);

        if(!user) {
            throw new NotFoundError("User not found");
        }

        return passwordHandler(user);
    }

}