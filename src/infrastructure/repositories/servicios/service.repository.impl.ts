import {
  ServerResponseEntity,
  ServiceDataSource,
  ServiceEntity,
} from "../../../domain";
import { ServiceRepository } from "../../../domain/repositories";
import { PrismaClient } from "@prisma/client";
import { ServiceModel } from "../../model";
import { ServiceEntityMapper } from "../../mappers";


export class ServiceRepositoryImpl extends ServiceRepository {
  constructor(private readonly datasource: ServiceDataSource) {
    const prisma = new PrismaClient();
    super(prisma);
  }

  static createInstance(datasource: ServiceDataSource): ServiceRepositoryImpl {
    return new ServiceRepositoryImpl(datasource);
  }

  async getServiceDetails(id: number): Promise<ServiceEntity> {
    const serviceModel = await this.datasource.getServiceDetails(id);
    return ServiceEntity.fromObject(serviceModel);
  }

  async createService(serviceData: {
    service_name: string;
    userID: number;
    description: string;
  }): Promise<ServerResponseEntity["props"]> {
    const serviceModel = await this.datasource.createService({
      userId: serviceData.userID,
      service_name: serviceData.service_name,
      description: serviceData.description,
    });
    return serviceModel;
  }

  async getAllServices(): Promise<ServiceEntity[]> {
    try {
      const allServicesResponse = await this.datasource.getAllServices();
      if (!allServicesResponse.data) {
        throw new Error("La respuesta no contiene la propieda dasd 'data'");
      }
      const allServices = allServicesResponse.data.map(
        (serviceData: { [key: string]: any }) => {
          return ServiceEntity.fromObject(serviceData);
        }
      );
      return allServices;
    } catch (error) {
      throw new Error(
        `Error al recuperar todos los servicio dasda: ${
          (error as Error).message
        }`
      );
    }
  }
}
