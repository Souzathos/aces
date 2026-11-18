import { AppDataSource } from "../config/data-source";
import { CreateUbsDTO, CreateUbsDTOType } from "../dtos/ubs";
import { BadRequestError, ConflictError } from "../errors";
import { UBS } from "../models/UBS";
import { PatientRepo } from "../repositories/PatientRepo";
import { UbsRepo } from "../repositories/UbsRepo";

const ubsRepository = new UbsRepo();
const patientRepository = new PatientRepo();

export class UbsService {

    async createUbs(data: CreateUbsDTOType) {
        const parsed = CreateUbsDTO.safeParse(data ?? {})
        if(!parsed.success) {
            throw new BadRequestError(parsed.error.issues[0].message)
        }

        const { name, patientCount, employeeCount, address, addressNumber, postalCode } = parsed.data;
        const ubsExists = await ubsRepository.findByName(name);
        
        if(ubsExists) {
            throw new ConflictError("UBS already exists");
        }

        return ubsRepository.create({ name, patientCount, employeeCount, address, addressNumber, postalCode } as UBS);
    }
}