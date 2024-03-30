import { regularExps } from "../../../config";

export class CompanyDataDto {
  private constructor(
    public readonly commercial_name: string,
    public readonly detraction_account: string,
    public readonly ruc: string,
    public readonly business_name: string,
    public readonly exchange_type: string,
    public readonly address: string,
    public readonly contact_number: string,
    public readonly company_email: string
  ) {}
  static create(object: { [key: string]: any }): [string?, CompanyDataDto?] {
    const {
      commercial_name,
      detraction_account,
      ruc,
      business_name,
      exchange_type,
      address,
      contact_number,
      company_email,
    } = object;
    if (!commercial_name) return ["Missing commercial_name"];
    if (!detraction_account) return ["Missing detraction_account"];
    if (!ruc) return ["Missing ruc"];
    if (!business_name) return ["Missing business_name"];
    if (!exchange_type) return ["Missing exchange_type"];
    if (!address) return ["Missing address"];
    if (!contact_number) return ["Missing contact_numbr"];
    if (!company_email) return ["Missing company_email"];

    if (!regularExps.email.test(company_email)) return ["Invalid email format"];
    if (!regularExps.phoneNumber.test(contact_number))
      return ["Invalid contact number format"];

    return [
      undefined,
      new CompanyDataDto(
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
