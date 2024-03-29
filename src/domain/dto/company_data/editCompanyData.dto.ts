import { regularExps } from "../../../config";


export class EditCompanyDataDto {
    constructor(
        public readonly commercial_name?: string,
        public readonly deduction_account?: string,
        public readonly ruc?: string,
        public readonly bussiness_name?: string,
        public readonly exchange_type?: string,
        public readonly address?: string,
        public readonly contact_number?: string,
        public readonly company_email?: string
    ) {}

    static create(obj: {[key: string]: any}): [string?, EditCompanyDataDto?] {
        const { commercial_name, deduction_account, ruc, bussiness_name, exchange_type, address, contact_number, company_email } = obj;

        if (!commercial_name && !deduction_account && !ruc && !bussiness_name && !exchange_type && !address && !contact_number && !company_email) {
            return ['No fields were provided to update.'];
        }
        if (company_email && !regularExps.email.test(company_email)) {
            return ['Invalid format email'];
        }
        if (contact_number && !regularExps.phoneNumber.test(contact_number)) {
            return ['Invalid format contact number'];
        }

        return [undefined, new EditCompanyDataDto(
            commercial_name,
            deduction_account,
            ruc,
            bussiness_name,
            exchange_type,
            address,
            contact_number,
            company_email
        )];
    }
}