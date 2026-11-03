import z from 'zod'
import { UserRoles } from '../../enums/UserRoles'

export const CreateUserDTO = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    cpf: z.string().length(11, "CPF must be 11 characters long"),
    phone: z.string().min(10, "Phone number must be at least 10 characters long"),
    address: z.string().min(1, "Address is required"),
    addressNumber: z.string().min(1, "Address number is required"),
    postalCode: z.string().length(8, "Postal code must be 8 characters long"),
    role: z.enum(UserRoles, "Role must be either 'admin', 'user' or 'doctor'"),
})

export type CreateUserDTOType = z.infer<typeof CreateUserDTO>