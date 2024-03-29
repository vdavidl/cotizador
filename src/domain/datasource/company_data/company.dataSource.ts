import { CompanyDataDto, EditCompanyDataDto, IdDto } from "../../dto";
import { ServerResponseEntity } from "../../server";


export abstract class CompanyDataSource{
    abstract showCompanyData(): Promise<ServerResponseEntity['props']>;
    abstract createCompanyData(createCompanyDataDto: CompanyDataDto): Promise <ServerResponseEntity['props']>
    abstract editCompanyData(companyDataId: IdDto,editDataCompanyDto: EditCompanyDataDto): Promise<ServerResponseEntity['props']>
}