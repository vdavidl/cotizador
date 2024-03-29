import { CustomError } from "../errors";


interface CompanyDataProps{
    id: number,
    commercial_name: string,
    deduction_account: string,
    ruc: string,
    bussiness_name: string,
    exchange_type: string,
    address: string,
    contact_number: string,
    company_email: string
}

export class CompanyDataEntity{
    constructor(
        public readonly props: CompanyDataProps
    ){}

    static fromObject(object: {[key: string]: any}): CompanyDataEntity{
        const {id, commercial_name, deduction_account, ruc, bussiness_name, exchange_type, address, contact_number, company_email} = object;

        if (!id) throw CustomError.badRequest('id is required');
        if (!commercial_name) throw CustomError.badRequest('commercial name is required');
        if (!deduction_account) throw CustomError.badRequest('deduction account is required');
        if (!ruc) throw CustomError.badRequest('ruc is required');
        if (!bussiness_name) throw CustomError.badRequest('bussiness_name is required');
        if (!exchange_type) throw CustomError.badRequest('exchange_type is required');
        if (!address) throw CustomError.badRequest('address is required');
        if (!contact_number) throw CustomError.badRequest('contact_number is required');
        if (!company_email) throw CustomError.badRequest('company email is required');

        return new CompanyDataEntity({
            id: id,
            commercial_name: commercial_name,
            deduction_account: deduction_account,
            ruc: ruc,
            bussiness_name: bussiness_name,
            exchange_type: exchange_type,
            address: address,
            contact_number: contact_number,
            company_email: company_email
        })

    }
}