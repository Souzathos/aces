import z from 'zod';
import { CreateUserDTO } from '../user';

export const CreatePatientDTO = CreateUserDTO.omit({role: true}).extend({
    cpf: z.string().min(11, "CPF must be at least 11 characters").max(14, "CPF must be at most 14 characters"),
    bloodType: z.string().max(3, "Blood type must be at most 3 characters")
})

export type CreatePatientDTOType = z.infer<typeof CreatePatientDTO>