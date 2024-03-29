import { CompanyDataDto, EditCompanyDataDto, IdDto } from "../../dto";
import { ServerResponseEntity } from "../../server";


export abstract class CompanyDataRepository{
    abstract showDataCompany():Promise<ServerResponseEntity['props']>;
    abstract createCompanyData(createCompanyDataDto: CompanyDataDto): Promise <ServerResponseEntity['props']>;
    abstract editDataCompany(idCompanyDataDto: IdDto, editCompanyDataDto: EditCompanyDataDto):Promise<ServerResponseEntity['props']>;
}