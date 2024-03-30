import { StageDto } from "./stage.dto";

export class CreateQuotationDto {
  private constructor(
    public readonly prospect_id: number,
    public readonly service_id: number,
    public readonly user_id: number,
    public readonly net_amount: number,
    public readonly discount: number,
    public readonly quotation_date: Date,
    public readonly final_delivery_date: Date,
    public readonly description: string,
    public readonly important: string,
    public readonly billing: string,
    public readonly igv_included: boolean,
    public readonly type_currency: string,
    public readonly bank: string,
    public readonly bank_code: number,
    public readonly interbank_code: number,
    public readonly detraction_account: number,
    public readonly stages: StageDto[]
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, CreateQuotationDto?] {
    const {
      prospect_id,
      service_id,
      user_id,
      net_amount,
      discount,
      quotation_date,
      final_delivery_date,
      description,
      important,
      billing,
      igv_included,
      type_currency,
      bank,
      bank_code,
      interbank_code,
      detraction_account,
      stages,
    } = object;

    // Validación y conversión a decimal para discount
    const discountDecimal = parseFloat(discount);
    if (isNaN(discountDecimal)) {
      return ["Discount must be a valid decimal number (e.g., 0.25, 1.00)"];
    }
    if (discountDecimal < 0 || discountDecimal > 1.0) {
      return ["Discount must be between 0.0 and 1.0"];
    }
    if (discountDecimal.toFixed(4) !== discount) {
      return ["Discount can have up to 4 decimal places"];
    }

    if (!user_id) return ["Missing creator user id"];
    if (!prospect_id) return ["Missing prospect id"];
    if (!service_id) return ["Missing service id"];
    if (!net_amount) return ["Missing net_amount"];
    if (!discount) return ["Missing discount"];
    if (!quotation_date) return ["Missing quotation_date"];
    if (!final_delivery_date) return ["Missing final_delivery_date"];
    if (!description) return ["Missing quotation description"];
    if (!important) return ["Missing important"];
    if (!billing) return ["Missing billing"];
    if (!igv_included) return ["Missing igv"];
    if (!type_currency) return ["Missing type_currency"];
    if (!bank) return ["Missing bank"];
    if (!bank_code) return ["Missing bank_code"];
    if (!interbank_code) return ["Missing interbank_code"];
    if (!detraction_account) return ["Missing detraction_account"];
    if (!stages) return ["Missing stages"];

    return [
      undefined,
      new CreateQuotationDto(
        prospect_id,
        service_id,
        user_id,
        net_amount,
        discount,
        quotation_date,
        final_delivery_date,
        description,
        important,
        billing,
        igv_included,
        type_currency,
        bank,
        bank_code,
        interbank_code,
        detraction_account,
        stages
      ),
    ];
  }
}
