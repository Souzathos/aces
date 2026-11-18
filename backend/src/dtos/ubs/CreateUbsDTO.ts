import z from "zod";

export const CreateUbsDTO = z.object({
    name: z.string().min(1, "Name is required"),
    patientCount: z.number().int().nonnegative("Patient count must be a non-negative integer"),
    employeeCount: z.number().int().nonnegative("Employee count must be a non-negative integer"),
    address: z.string().min(1, "Address is required"),
    addressNumber: z.string().min(1, "Address number is required"),
    postalCode: z.string().length(8, "Postal code must be 8 characters long"),
});

export type CreateUbsDTOType = z.infer<typeof CreateUbsDTO>