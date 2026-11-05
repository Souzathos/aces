import z from 'zod'

export const CreateReviewDTO = z.object({
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
  reviewDate: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
  comment: z.string().max(500, "Comment must be at most 500 characters"),
  doctorId: z.string().uuid("Doctor ID must be a valid UUID"),
  patientCpf: z.string().length(11, "Patient CPF must be 11 characters long"),
})

export type CreateReviewDTOType = z.infer<typeof CreateReviewDTO>