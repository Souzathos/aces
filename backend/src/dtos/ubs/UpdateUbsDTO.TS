import {CreateUbsDTO} from './CreateUbsDTO'
import z from 'zod';

export const UpdateUbsDTO = CreateUbsDTO.partial()
export type UpdateUbsDTOType = z.infer<typeof UpdateUbsDTO>