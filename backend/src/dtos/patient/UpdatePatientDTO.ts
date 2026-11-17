import {CreatePatientDTO} from './CreatePatientDTO'
import z from 'zod';

export const UpdatePatientDTO = CreatePatientDTO.omit({ cpf: true }).partial()
export type UpdatePatientDTOType = z.infer<typeof UpdatePatientDTO>