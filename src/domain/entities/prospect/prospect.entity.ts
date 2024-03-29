import { CustomError } from "../../errors";


interface ProspectProps {
    id:       number;
    // user_id: number; - id del usuario que creó el prospecto
    organization_name: string;
    contact_person: string;
    type: string;
    email:    string;
    identity_document: string;
    whatsapp: string;
    first_contact_date: string;
    last_contact_date: string;
}
export class ProspectEntity {
    constructor(
        public readonly props: ProspectProps
    ) { }
    static fromObject(object: {[ key: string]: any}):  ProspectEntity{
        const { id, organization_name, contact_person, type, email, identity_document, whatsapp, first_contact_date, last_contact_date} = object
        
        if (!id) throw CustomError.badRequest('id is required');
        if (!organization_name) throw CustomError.badRequest('organization_name is required');
        if (!email) throw CustomError.badRequest('email is required');
        if (!type) throw CustomError.badRequest('type is required');

        return new ProspectEntity({
            id:       id,
            organization_name: organization_name,
            contact_person: contact_person,
            type: type,
            email: email,
            identity_document: identity_document,
            whatsapp: whatsapp,
            first_contact_date: first_contact_date.toISOString(),
            last_contact_date: last_contact_date.toISOString()
        })
    }
}