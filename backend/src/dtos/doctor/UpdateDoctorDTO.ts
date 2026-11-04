// UpdateDoctorDTO.ts
import { z } from 'zod'
import { CreateDoctorDTO } from './CreateDoctorDTO'

export const UpdateDoctorDTO = CreateDoctorDTO.partial()
export type UpdateDoctorDTOType = z.infer<typeof UpdateDoctorDTO>
