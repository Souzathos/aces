import { BadRequestError, NotFoundError } from "../errors";
import { UserRepo } from "../repositories/UserRepo";
import { comparePassword } from "../utils/PasswordUtils";


export class AuthService {
    private userRepo = new UserRepo();

    async login(email: string, password: string) {
        const user = await this.userRepo.findByEmail(email);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            throw new BadRequestError("Invalid credentials");
        }

        delete (user as any).password;
        
        return user
    }
}