import { BadRequestError, NotFoundError } from "../errors";
import { UserRepo } from "../repositories/UserRepo";
import { comparePassword } from "../utils/PasswordUtils";
import { LoginDTO, LoginDTOType } from "../dtos/auth";
import { generateToken } from "../utils/TokenUtils";


export class AuthService {
    private userRepo = new UserRepo();

    async login(data: LoginDTOType) {
        const parsed = LoginDTO.safeParse(data ?? {});
        if (!parsed.success) {
            throw new BadRequestError(parsed.error.issues[0].message);
        }
        const { email, password } = parsed.data;

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