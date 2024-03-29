import { CustomError } from "../../errors";


interface ProspectProps {
    id:       number;
    organization_name: string;
    contact_person: string;
    type: string;
    // email:    string;
    identity_document: string;
    whatsapp: string;
    last_contact_date: string;
}
export class ProspectListEntity {
    constructor(
        public readonly props: ProspectProps
    ) { }
    static fromObject(object: {[ key: string]: any}):  ProspectListEntity{
        const { id, organization_name, contact_person, type, identity_document, whatsapp, last_contact_date} = object
        
        if (!id) throw CustomError.badRequest('id is required');
        if (!organization_name) throw CustomError.badRequest('organization_name is required');
        // if (!email) throw CustomError.badRequest('email is required');
        if (!type) throw CustomError.badRequest('type is required');
        if (!identity_document) throw CustomError.badRequest('identity_document is required');

        return new ProspectListEntity({
            id:       id,
            organization_name: organization_name,
            contact_person: contact_person,
            type: type,
            identity_document: identity_document,
            whatsapp: whatsapp,
            last_contact_date: last_contact_date.toISOString()
        })
    }
}