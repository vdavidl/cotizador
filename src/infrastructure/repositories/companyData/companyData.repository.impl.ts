import { CompanyDataDto, CompanyDataRepository, CompanyDataSource, EditCompanyDataDto, IdDto, ServerResponseEntity } from "../../../domain";




export class CompanyDataRepositoryImpl implements CompanyDataRepository{
    constructor(
        private readonly datasource: CompanyDataSource
    ){}

    showDataCompany(): Promise<ServerResponseEntity['props']> {
        return this.datasource.showCompanyData();
    }
    createCompanyData(createCompanyDataDto: CompanyDataDto): Promise <ServerResponseEntity['props']>{
        return this.datasource.createCompanyData(createCompanyDataDto);
    }
    editDataCompany(idCompanyDataDto: IdDto, editCompanyDataDto: EditCompanyDataDto): Promise<ServerResponseEntity['props']> {
        return this.datasource.editCompanyData(idCompanyDataDto, editCompanyDataDto);
    }
}