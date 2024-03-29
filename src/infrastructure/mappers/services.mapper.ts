import { ServiceEntity } from "../../domain";
import { ServiceModel } from "../model";

export class ServiceEntityMapper {
  static serviceToJson(service: ServiceModel): ServiceEntity["props"] {
    return ServiceEntity.fromObject({
      id: service.id,
      service_name: service.service_name,
      description: service.description,
    }).props;
  }
}

export function mapServiceToResponse(service: ServiceModel): any {
  return {
    id: service.id,
    service_name: service.service_name,
    description: service.description,
  };
}
