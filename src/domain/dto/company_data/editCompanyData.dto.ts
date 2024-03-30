import { regularExps } from "../../../config";

export class EditCompanyDataDto {
  constructor(
    public readonly commercial_name?: string,
    public readonly detraction_account?: string,
    public readonly ruc?: string,
    public readonly business_name?: string,
    public readonly exchange_type?: string,
    public readonly address?: string,
    public readonly contact_number?: string,
    public readonly company_email?: string
  ) {}

  static create(obj: { [key: string]: any }): [string?, EditCompanyDataDto?] {
    const {
      commercial_name,
      detraction_account,
      ruc,
      business_name,
      exchange_type,
      address,
      contact_number,
      company_email,
    } = obj;

    if (
      !commercial_name &&
      !detraction_account &&
      !ruc &&
      !business_name &&
      !exchange_type &&
      !address &&
      !contact_number &&
      !company_email
    ) {
      return ["No fields were provided to update."];
    }
    if (company_email && !regularExps.email.test(company_email)) {
      return ["Invalid format email"];
    }
    if (contact_number && !regularExps.phoneNumber.test(contact_number)) {
      return ["Invalid format contact number"];
    }

    return [
      undefined,
      new EditCompanyDataDto(
        commercial_name,
        detraction_account,
        ruc,
        business_name,
        exchange_type,
        address,
        contact_number,
        company_email
      ),
    ];
  }
}
