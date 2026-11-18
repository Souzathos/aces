import { AppDataSource } from "../config/data-source";
import { UBS } from "../models/UBS";

type CreateUBSRecord = {
  patientCount: number;
  employeeCount: number;
  address: string;
  addressNumber: string;
  postalCode: string;
};

type UpdateUBSRecord = {
  patientCount?: number;
  employeeCount?: number;
  address?: string;
  addressNumber?: string;
  postalCode?: string;
};

export class UbsRepo {
    private ubsRepository = AppDataSource.getRepository(UBS);

    create({patientCount, employeeCount, address, addressNumber, postalCode}: CreateUBSRecord) {

        const ubs = this.ubsRepository.create({
            patientCount,
            employeeCount,
            address,
            addressNumber,
            postalCode
        });

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