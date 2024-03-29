import { CustomError } from "../../errors";


interface QuotationProps{
    id: number;
    // prospect_id: number;
    // service_id: number;
    // user_id: number;
    net_amount: number;
    discount: number;
    quotation_date: Date;
    igv_included: boolean;
    type_currency: string;
    // service: string;
    // prospect: string,

}

export class QuotationListEntity{
    constructor(
        public readonly props: QuotationProps
    ){}
    static fromObject(object: {[ key: string]: any}): QuotationListEntity{
        const{id, net_amount, discount, quotation_date, igv_included, type_currency} = object;
        console.log(object)
        if (!id) throw CustomError.badRequest('id is required');
        if (!net_amount) throw CustomError.badRequest('net amount is required');
        if (!discount) throw CustomError.badRequest('discount is required');
        if (!quotation_date) throw CustomError.badRequest('quotation_date is required');
        if (igv_included == null) throw CustomError.badRequest('igv_included is required');

        return new QuotationListEntity({
            id: id,
            net_amount: net_amount,
            discount: discount,
            quotation_date: quotation_date.toISOString(),
            igv_included: igv_included,
            type_currency: type_currency,
            // service: service,
            // prospect: prospect,
        })

    }
}