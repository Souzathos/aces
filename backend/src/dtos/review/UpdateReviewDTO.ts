import { CreateReviewDTO,  } from "./CreateReviewDTO";
import z from 'zod'

export const UpdateReviewDTO = CreateReviewDTO.omit({ doctorId: true, patientCpf: true }).partial()

export type UpdateReviewDTOType = z.infer<typeof UpdateReviewDTO>