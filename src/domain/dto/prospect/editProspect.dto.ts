import { regularExps } from "../../../config";

//CLASE para modificar campos de un registro, en base a solo algunos campos enviados desde el front end
//No permite 0 campos
//--- Debería retornar un objeto con claves: valor undefined -- prisma ignorará esos campos por lo que no hay problema
export class EditProspectDto{
    [key: string]: any;
    constructor(
        //public readonly user_id?: string, Dependerá de si se guardará tambien un registro de que usuario editó un prospecto.
        public readonly organization_name?: string,
        public readonly contact_person?: string,
        public readonly type?: string,
        public readonly email?: string,
        public readonly identity_document?: string,
        public readonly whatsapp?: string,
        public readonly first_contact_date?: Date,
        public readonly last_contact_date?: Date,
    ) {}

    static create(object: {[key: string]: any}): [string?, EditProspectDto?] {
        // Verificar si el objeto está vacío
        const{user_id, organization_name, contact_person, type, email, identity_document, whatsapp, first_contact_date, last_contact_date} = object;
        if (!user_id && !organization_name && !contact_person && !type && !email && !identity_document && !whatsapp && !first_contact_date && !last_contact_date) {
            return ['No fields were provided to update.'];
        }
        if (email && !regularExps.email.test(email)) {
            return ['Invalid email format'];
        }
        if (whatsapp && !regularExps.phoneNumber.test(whatsapp)) {
            return ['Invalid whatsapp number format'];
        }
    
        return [undefined, new EditProspectDto(
            //user_id,
            organization_name,
            contact_person,
            type,
            email,
            identity_document,
            whatsapp,
            first_contact_date,
            last_contact_date
        )];

    }
}