
import { CreateUserDTO, CreateUserDTOType, UpdateUserDTO, UpdateUserDTOType } from "../dtos/user";
import { BadRequestError, ConflictError, NotFoundError } from "../errors";
import { User } from "../models/User";
import { UserRepo } from "../repositories/UserRepo";
import { hashPassword } from "../utils/PasswordUtils";

const userRepo = new UserRepo();


export function passwordHandler({ password: _password, ...user }: User): Omit<User, "password"> {
    return user;
}

export class UserService {
    async createUser(data: CreateUserDTOType) {
        const parsed = CreateUserDTO.safeParse(data ?? {});
        if (!parsed.success) {
            throw new BadRequestError(parsed.error.issues[0].message);
        }
        const { name, email, password, cpf, phone, address, addressNumber, postalCode, role } = parsed.data;
        
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

    async update(id: number, data: UpdateUserDTOType) {
        const parsed = UpdateUserDTO.safeParse(data ?? {});
        if (!parsed.success) {
            throw new BadRequestError(parsed.error.issues[0].message);
        }
        const userData = parsed.data;
        if (Object.keys(userData).length === 0) {
            throw new BadRequestError("At least one user field must be provided");
        }

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

    async listByCpf(cpf: string) {

        const user = await userRepo.findByCpf(cpf);

        if(!user) {
            throw new NotFoundError("User not found");
        }

        return passwordHandler(user);
    }

}