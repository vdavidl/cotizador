import { regularExps } from "../../../config";

export class CreateProspectDto {
  private constructor(
    public readonly user_id: number,
    public readonly organization_name: string,
    public readonly contact_person: string,
    public readonly type: string,
    public readonly email: string,
    public readonly identity_document: string,
    public readonly whatsapp: string,
    public readonly first_contact_date: Date,
    public readonly last_contact_date: Date
  ) {}

  static create(obj: { [key: string]: any }): [string?, CreateProspectDto?] {
    const {
      user_id,
      organization_name,
      contact_person,
      type,
      email,
      identity_document,
      whatsapp,
      first_contact_date,
      last_contact_date,
    } = obj;

    //Lista de campos requeridos
    const requiredFields = [
      "user_id",
      "organization_name",
      "contact_person",
      "type",
      "email",
      "identity_document",
      "whatsapp",
      "first_contact_date",
      "last_contact_date",
    ];

    for (let field of requiredFields) {
      if (!obj[field]) return [`Missing ${field}`];
    }

    // Verificar si el ID es un número válido, entero, sin decimales, ni letras. Pues se usará parseInt()
    if (isNaN(user_id)) return ["Invalid id format"];

    //Verifica fecha de formato válido
    if (
      isNaN(Date.parse(first_contact_date)) ||
      isNaN(Date.parse(last_contact_date))
    )
      return ["Invalid date format"];

    if (!regularExps.email.test(email)) return ["Invalid format email"];
    if (!regularExps.phoneNumber.test(whatsapp))
      return [`Invalid phone number format:${whatsapp}`];

    return [
      undefined,
      new CreateProspectDto(
        parseInt(user_id),
        organization_name,
        contact_person,
        type,
        email,
        identity_document,
        whatsapp,
        first_contact_date,
        last_contact_date
      ),
    ];
  }
}
