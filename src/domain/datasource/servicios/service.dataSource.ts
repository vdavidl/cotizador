import { ServerResponseEntity } from "../..";
import { CreateServiceDto } from "../../dto/servicios/createService.dto";

export abstract class ServiceDataSource {
  abstract createService(
    createServiceDto: CreateServiceDto
  ): Promise<ServerResponseEntity["props"]>;
  abstract updateService(
    serviceId: number,
    updateData: any
  ): Promise<ServerResponseEntity["props"]>;
  abstract getServiceDetails(
    serviceId: number
  ): Promise<ServerResponseEntity["props"]>;
  abstract getAllServices(): Promise<ServerResponseEntity["props"]>;
}
