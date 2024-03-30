import { ProspectEntity, ProspectListEntity } from "../../domain";
import { ProspectListModel, ProspectModel } from "../model";

export class ProspectEntityMapper {
  static prospectsToJson(prospect: ProspectModel): ProspectEntity["props"] {
    return ProspectEntity.fromObject({
      id: prospect.id,
      organization_name: prospect.organization_name,
      contact_person: prospect.contact_person,
      type: prospect.type,
      email: prospect.email,
      identity_document: prospect.identity_document,
      whatsapp: prospect.whatsapp,
      first_contact_date: prospect.first_contact_date,
      last_contact_date: prospect.last_contact_date,
    }).props;
  }
}

export class ProspectListEntityMapper {
  static prospectsToJson(
    prospect: ProspectListModel
  ): ProspectListEntity["props"] {
    return ProspectListEntity.fromObject({
      id: prospect.id,
      organization_name: prospect.organization_name,
      contact_person: prospect.contact_person,
      type: prospect.type,
      // email:    prospect.email,
      identity_document: prospect.identity_document,
      whatsapp: prospect.whatsapp,
      last_contact_date: prospect.last_contact_date,
    }).props;
  }
}
