import z from 'zod'
import {CreateUserDTO} from './CreateUserDTO'

export const UpdateUserDTO = CreateUserDTO.partial().omit({ role: true })

export type UpdateUserDTOType = z.infer<typeof UpdateUserDTO>