import z from 'zod';
import { CreateUserDTO } from '../user';

export const CreatePatientDTO = CreateUserDTO.omit({role: true}).extend({
    cpf: z.string().length(11, "CPF must be 11 characters long"),
    bloodType: z.string().max(3, "Blood type must be at most 3 characters")
})

export type CreatePatientDTOType = z.infer<typeof CreatePatientDTO>