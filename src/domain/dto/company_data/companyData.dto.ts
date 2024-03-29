import { regularExps } from "../../../config";



export class CompanyDataDto{
    private constructor(
        public readonly commercial_name: string,
        public readonly deduction_account: string,
        public readonly ruc: string,
        public readonly bussiness_name: string,
        public readonly exchange_type: string,
        public readonly address: string,
        public readonly contact_number: string,
        public readonly company_email: string
    ){}
    static create(object: {[key: string] : any}): [string?, CompanyDataDto?]{
        const {commercial_name, deduction_account, ruc, bussiness_name, exchange_type, address, contact_number, company_email} =object;
        if(!commercial_name) return ['Missing commercial_name'];
        if(!deduction_account) return ['Missing deduction_account'];
        if(!ruc) return ['Missing ruc'];
        if(!bussiness_name) return ['Missing bussiness_name'];
        if(!exchange_type) return ['Missing exchange_type'];
        if(!address) return ['Missing address'];
        if(!contact_number) return ['Missing contact_numbr'];
        if(!company_email) return ['Missing company_email'];

        if (!regularExps.email.test(company_email)) return ['Invalid email format'];
        if (!regularExps.phoneNumber.test(contact_number)) return ['Invalid contact number format']

        return [undefined, new CompanyDataDto(commercial_name, deduction_account, ruc, bussiness_name, exchange_type, address, contact_number, company_email)] 
    }
}