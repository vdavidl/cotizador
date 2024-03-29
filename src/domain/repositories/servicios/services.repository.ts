import { PrismaClient } from "@prisma/client";
import { ServiceEntity } from "../../entities/service.entity";
import { ServiceProps } from "../../entities/service.entity";
import { ServerResponseEntity } from "../../server";

export abstract class ServiceRepository {
  protected prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  abstract getAllServices(): Promise<ServiceEntity[]>;

  abstract createService(serviceData: any): Promise<ServerResponseEntity["props"]>;

  abstract getServiceDetails(id: number): Promise<ServiceEntity>;
}
