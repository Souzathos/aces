import { z } from 'zod'
import { CreateUserDTO } from '../user/CreateUserDTO'

export const CreateDoctorDTO = CreateUserDTO
  .omit({ role: true })
  .extend({
    crm: z.string().min(1, "CRM is required").max(20, "CRM must be at most 20 characters"),
    specialty: z.string().min(1, "Specialty is required").max(100, "Specialty must be at most 100 characters"),
    ubs_id: z.number().int().positive("UBS ID must be a positive integer"),
  })

export type CreateDoctorDTOType = z.infer<typeof CreateDoctorDTO>
