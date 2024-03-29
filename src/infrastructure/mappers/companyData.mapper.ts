import { CompanyDataEntity } from "../../domain";
import { CompanyDataModel } from "../model";



export class CompanyDataEntityMapper{
    static companyDataToJson(companyData:CompanyDataModel) : CompanyDataEntity['props']{
        return CompanyDataEntity.fromObject({
            id: companyData.id,
            commercial_name: companyData.commercial_name,
            deduction_account: companyData.deduction_account,
            ruc: companyData.ruc,
            bussiness_name: companyData.bussiness_name,
            exchange_type: companyData.exchange_type,
            address: companyData.address,
            contact_number: companyData.contact_number,
            company_email: companyData.company_email
        }).props;
    }
}