import { Prisma } from "@prisma/client";

export interface QuotationModel{
    id: number,
    prospect_id_fk: number,
    service_id_fk: number,
    user_id_fk: number,
    net_amount: Prisma.Decimal,
    discount: Prisma.Decimal,
    quotation_date: Date,
    final_delivery_date: Date,
    description: string,
    important: string,
    billing: string,
    igv_included: boolean,
    type_currency: string,
    bank: string,
    bank_code: Prisma.Decimal,
    interbank_code: Prisma.Decimal,
    detraction_account: Prisma.Decimal
}


export interface QuotationListModel{
    id: number,
    // prospect_id_fk: number,
    // service_id_fk: number,
    // user_id_fk: number,
    net_amount: Prisma.Decimal,
    discount: Prisma.Decimal,
    quotation_date: Date,
    igv_included: boolean,
    type_currency: string,
    // service: {service_name: string},
    // prospect:{organization_name: string},
}

export interface QuotationOfProspectModel{
    id: number,
    // prospect_id_fk: number,
    // service_id_fk: number,
    // user_id_fk: number,
    net_amount: Prisma.Decimal,
    discount: Prisma.Decimal,
    quotation_date: Date,
    igv_included: boolean,
    type_currency: string,
    service: { service_name : string}
}