// src/infrastructure/datasource/service/service.dataSource.ts

import { PrismaClient } from "@prisma/client";
import { ServiceDataSource } from "../../../domain/datasource/servicios/service.dataSource";
import {
  ServerResponseEntity,
  CreateServiceDto,
  ServiceEntity,
} from "../../../domain";
import { mapServiceToResponse } from "../../mappers/services.mapper";

export class ServiceDataSourceImpl extends ServiceDataSource {
  private prisma: PrismaClient;

  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  async createService(
    createServiceDto: CreateServiceDto
  ): Promise<ServerResponseEntity["props"]> {
    try {
      const { service_name, description } = createServiceDto;
      const newService = await this.prisma.service.create({
        data: {
          service_name: service_name,
          description,
          user: {
            connect: {
              id: 1,
            },
          },
        },
      });
      const serviceToEntity = ServiceEntity.fromObject(newService);

      return {
        data: { serviceToEntity },
        status: "success",
        message: "Service created successfully",
        error: null,
      };
    } catch (error) {
      throw new Error(`Error creating service: ${(error as Error).message}`);
    }
  }

  async updateService(
    serviceId: number,
    updateData: any
  ): Promise<ServerResponseEntity["props"]> {
    try {
      const updatedService = await this.prisma.service.update({
        where: { id: serviceId },
        data: updateData,
      });

      return {
        data: updatedService,
        status: "success",
        message: "Service updated successfully",
        error: null,
      };
    } catch (error) {
      throw new Error(`Error updating service: ${(error as Error).message}`);
    }
  }

  async getServiceDetails(
    serviceId: number
  ): Promise<ServerResponseEntity["props"]> {
    try {
      const serviceDetails = await this.prisma.service.findUnique({
        where: { id: serviceId },
      });

      if (!serviceDetails) {
        throw new Error("Service not found");
      }

      const mappedData = mapServiceToResponse(serviceDetails);

      return {
        data: mappedData,
        status: "success",
        message: "Service details retrieved successfully",
        error: null,
      };
    } catch (error) {
      throw new Error(
        `Error retrieving service details: ${(error as Error).message}`
      );
    }
  }

  async getAllServices(): Promise<ServerResponseEntity["props"]> {
    try {
      const allServices = await this.prisma.service.findMany();
      return {
        data: allServices,
        status: "success",
        message: "All services retrieved successfully",
        error: null,
      };
    } catch (error) {
      throw new Error(
        `Error retrieving all services: ${(error as Error).message}`
      );
    }
  }
}
