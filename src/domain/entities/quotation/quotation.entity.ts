import { CustomError } from "../../errors";


interface QuotationProps{
    id: number;
    // prospect_id: number;
    service_id: number;
    // user_id: number;
    net_amount: number;
    discount: number;
    quotation_date: Date;
    final_delivery_date: Date;
    description: string,
    important: string;
    billing: string;
    igv_included: boolean;
    type_currency: string;
    bank: string;
    bank_code: number;
    interbank_code: number;
    detraction_account: number
}

export class QuotationEntity{
    constructor(
        public readonly props: QuotationProps
    ){}
    static fromObject(object: {[ key: string]: any}): QuotationEntity{
        const{id, service_id, net_amount, discount, quotation_date, final_delivery_date, description, important, billing, igv_included, type_currency, bank, bank_code, interbank_code, detraction_account} = object;

        if (!id) throw CustomError.badRequest('id is required');
        // if (!user_id) throw CustomError.badRequest('creator user id is required');
        if (!net_amount) throw CustomError.badRequest('net amount is required');
        if (!discount) throw CustomError.badRequest('discount is required');
        if (!quotation_date) throw CustomError.badRequest('quotation_date is required');
        if (!description) throw CustomError.badRequest('descriptionis required');
        if (!billing) throw CustomError.badRequest('billing is required');

        return new QuotationEntity({
            id: id,
            // prospect_id: prospect_id,
            service_id: service_id,
            // user_id: user_id,
            net_amount: net_amount,
            discount: discount,
            quotation_date: quotation_date.toISOString(),
            final_delivery_date: final_delivery_date.toISOString(),
            description: description,
            important: important,
            billing: billing,
            igv_included: igv_included,
            type_currency: type_currency,
            bank: bank,
            bank_code: bank_code,
            interbank_code: interbank_code,
            detraction_account: detraction_account
        })

    }
}