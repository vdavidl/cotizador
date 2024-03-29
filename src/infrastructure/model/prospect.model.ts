export interface ProspectModel {
    id: number;
    // user_id_fk: number;
    organization_name: string;
    contact_person: string;
    type: string;
    email:    string;
    identity_document: string;
    whatsapp: string,
    first_contact_date: Date;
    last_contact_date: Date;
}

export interface ProspectListModel {
    id: number;
    organization_name: string;
    contact_person: string;
    type: string;
    // email:    string;
    identity_document: string;
    whatsapp: string,
    last_contact_date: Date;
}