import { AppDataSource } from "../config/data-source";
import { UBS } from "../models/UBS";

type CreateUBSRecord = Pick<UBS, "name" | "patientCount" | "employeeCount" | "address" | "addressNumber" | "postalCode">;


type UpdateUBSRecord = Partial<CreateUBSRecord>;


export class UbsRepo {
    private ubsRepository = AppDataSource.getRepository(UBS);

    create(data: CreateUBSRecord) {
        const ubs = this.ubsRepository.create(data);
        return this.ubsRepository.save(ubs);
    }

    update(id: number, ubsData: UpdateUBSRecord) {
        return this.ubsRepository.update(id, ubsData);
    }

    delete(id: number) {
        return this.ubsRepository.delete(id);
    }

    listAll() {
        return this.ubsRepository.find();
    }

    findById(id: number) {
        return this.ubsRepository.findOneBy({ id });
    }   

    findByName(name: string) {
        return this.ubsRepository.findOneBy({ name });
    }
    
    findByPostalCode(postalCode: string) {
        return this.ubsRepository.findOneBy({ postalCode });
    }

    insertDoctor(ubsId: number, doctorId: number) {
        return this.ubsRepository.createQueryBuilder()
            .relation(UBS, "doctors")
            .of(ubsId)
            .add(doctorId);
    }

    removeDoctor(ubsId: number, doctorId: number) {
        return this.ubsRepository.createQueryBuilder()
            .relation(UBS, "doctors")
            .of(ubsId)
            .remove(doctorId);
    }

    updatePatientCount(ubsId: number, patientCount: number) {
        return this.ubsRepository.update(ubsId, { patientCount });
    }

    updateEmployeeCount(ubsId: number, employeeCount: number) {
        return this.ubsRepository.update(ubsId, { employeeCount });
    }

}