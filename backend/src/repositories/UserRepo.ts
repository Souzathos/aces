import { AppDataSorce } from "../config/data-source";
import { User } from "../models/User";



export class UserService {
  
    create(user: User) {
        AppDataSorce.(user)
    }
}   