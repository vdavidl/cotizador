import { QuotationEntity, QuotationListEntity, QuotationOfProspectEntity } from "../../../domain";
import {QuotationListModel, QuotationModel, QuotationOfProspectModel } from "../../model";


export class QuotationEntityMapper{
    static quotationToJson(quotation: QuotationModel): QuotationEntity['props']{
        return QuotationEntity.fromObject({
            id: quotation.id,
            // prospect_id: quotation.prospect_id_fk,
            service_id: quotation.service_id_fk,
            // user_id: quotation.user_id_fk,
            net_amount: quotation.net_amount,
            discount: quotation.discount,
            quotation_date: quotation.quotation_date,
            final_delivery_date: quotation.final_delivery_date,
            description: quotation.description,
            important: quotation.important,
            billing: quotation.billing,
            igv_included: quotation.igv_included,
            type_currency: quotation.type_currency,
            bank: quotation.bank,
            bank_code: quotation.bank_code,
            interbank_code: quotation.interbank_code,
            detraction_account: quotation.detraction_account
        }).props;
    }
}


//MAPPER PARA MOSTRAR LA LISTA DE COTIZACIONES
export class QuotationListEntityMapper{
    static quotationToJson(quotation: QuotationListModel): QuotationListEntity['props']{
        console.log(quotation)
        return QuotationListEntity.fromObject({
            id: quotation.id,
            net_amount: quotation.net_amount,
            discount: quotation.discount,
            quotation_date: quotation.quotation_date,
            igv_included: quotation.igv_included,
            type_currency: quotation.type_currency,
            // service: quotation.service.service_name,
            // prospect: quotation.prospect.organization_name,
        }).props;
    }
}


//MAPPER PARA MOSTRAR TODAS LAS COTIZACIONES DE UN PROSPECTO
export class QuotationOfProspectEntityMapper{
    static quotationToJson(quotation: QuotationOfProspectModel): QuotationOfProspectEntity['props']{
        return QuotationOfProspectEntity.fromObject({
            id: quotation.id,
            net_amount: quotation.net_amount,
            discount: quotation.discount,
            quotation_date: quotation.quotation_date,
            igv_included: quotation.igv_included,
            type_currency: quotation.type_currency,
            service: quotation.service.service_name
        }).props;
    }
}