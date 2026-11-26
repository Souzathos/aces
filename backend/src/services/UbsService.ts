import { AppDataSource } from "../config/data-source";
import { CreateUbsDTO, CreateUbsDTOType, UpdateUbsDTOType } from "../dtos/ubs";
import { BadRequestError, ConflictError } from "../errors";
import { UBS } from "../models/UBS";
import { DoctorRepo } from "../repositories/DoctorRepo";
import { PatientRepo } from "../repositories/PatientRepo";
import { UbsRepo } from "../repositories/UbsRepo";

const ubsRepository = new UbsRepo();
const patientRepository = new PatientRepo();
const doctorRepository = new DoctorRepo()

export class UbsService {

    async createUbs(data: CreateUbsDTOType) {
        const parsed = CreateUbsDTO.safeParse(data ?? {})
        if(!parsed.success) {
            throw new BadRequestError(parsed.error.issues[0].message)
        }

        const ubsExists = await ubsRepository.findByName(parsed.data.name);
        
        if(ubsExists) {
            throw new ConflictError("UBS already exists");
        }

        return ubsRepository.create(parsed.data);
    }

    async updateUbs(id: number, data: UpdateUbsDTOType) {  
        const parsed = CreateUbsDTO.safeParse(data ?? {})
        if(!parsed.success) {
            throw new BadRequestError(parsed.error.issues[0].message)
        }

        const ubsExists = await ubsRepository.findById(id);
        
        if(!ubsExists) {
            throw new ConflictError("UBS not found");
        }

        return ubsRepository.update(id, parsed.data);

    }

    async deleteUbs(id: number) {
        const ubsExists = await ubsRepository.findById(id);
        
        if(!ubsExists) {
            throw new ConflictError("UBS not found");
        }

        const patients = await patientRepository.listAll();
        const patientsInUbs = patients.filter(patient => patient.ubs === ubsExists);
        if(patientsInUbs.length > 0) {
            throw new ConflictError("Cannot delete UBS with patients assigned");
        }
        
        ubsRepository.delete(id)
        
        return {message: 'UBS deleted successfully'};
    }

    async listAllUbs() {
        return ubsRepository.listAll();
    }

    async findUbsById(id: number) {
        const ubs = await ubsRepository.findById(id);
        
        if(!ubs) {
            throw new ConflictError("UBS not found");
        }

        return ubs;
    }

    async findUbsByName(name: string) {
        const ubs = await ubsRepository.findByName(name);
        
        if(!ubs) {
            throw new ConflictError("UBS not found");
        }

        return ubs;
    }   

    async findByPostalCode(postalCode: string) {
        const ubs = await ubsRepository.findByPostalCode(postalCode);
        
        if(!ubs) {
            throw new ConflictError("UBS not found");
        }

        return ubs;
    }


    async insertDoctor(ubsId: number, doctorId: number)  {
        const ubsExists = await ubsRepository.findById(ubsId);
        
        if(!ubsExists) {
            throw new ConflictError("UBS not found");
        }

        const doctorExists = await doctorRepository.findById(doctorId);
        if(!doctorExists) {
            throw new ConflictError("Doctor not found");
        }

        await ubsRepository.insertDoctor(ubsId, doctorId);

        return {message: 'Doctor inserted successfully'};
    }

}