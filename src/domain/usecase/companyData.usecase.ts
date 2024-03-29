import { CompanyDataDto, EditCompanyDataDto, IdDto } from "../dto";
import { CompanyDataRepository } from "../repositories";
import { ServerResponseEntity } from "../server";



export class CompanyDataUseCase{
    constructor(
        private readonly repository: CompanyDataRepository
    ){}
    async showCompanyData(): Promise<ServerResponseEntity['props']>{
        return this.repository.showDataCompany();
    }
    async createCompanyData(createCompanyData : CompanyDataDto): Promise<ServerResponseEntity['props']>{
        return this.repository.createCompanyData(createCompanyData);
    }

    async editCompanyData( idCompanyDataDto: IdDto,editCompanyDataDto: EditCompanyDataDto): Promise<ServerResponseEntity['props']>{
        return this.repository.editDataCompany(idCompanyDataDto, editCompanyDataDto);
    }
}