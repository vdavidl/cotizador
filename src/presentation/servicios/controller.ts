import { Request, Response, NextFunction } from "express";
import { ServiceRepository } from "../../domain/repositories/servicios/services.repository";
import { CustomError, ServerResponseEntity } from "../../domain";
import { ServiceEntityMapper } from "../../infrastructure/mappers";
import { ServiceModel } from "../../infrastructure/model";
import { ServiceRepositoryImpl } from "../../infrastructure";

export class ServiceController {
  private serviceRepositoryImpl: ServiceRepositoryImpl;

  constructor(serviceRepositoryImpl: ServiceRepositoryImpl) {
    this.serviceRepositoryImpl = serviceRepositoryImpl;
    this.createService = this.createService.bind(this);
  }

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json(
        ServerResponseEntity.fromObject({
          status: "error",
          message: "An error occurred while processing the request.",
          data: null,
          error: error.message,
        })
      );
    }
    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  getServices = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceEntities = await this.serviceRepositoryImpl.getAllServices();
      const services = serviceEntities.map((entity) => entity.props);
      res.status(200).json(services);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  async createService(req: Request, res: Response) {
    try {
      const { service_name, userID, description } = req.body;

      console.log("Datos recibidos del body:", req.body);

      if (!service_name || !userID || !description) {
        throw new Error("Missing required fields");
      }

      const createdService = await this.serviceRepositoryImpl.createService({
        service_name,
        userID,
        description,
      });

      res.status(201).json(createdService);
    } catch (error) {
      console.error("Error en el controlador createService:", error);
      this.handleError(res, error);
    }
  }

  getServiceDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const serviceId = req.params.id;
      const serviceDetails = await this.serviceRepositoryImpl.getServiceDetails(
        Number(serviceId)
      );
      if (!serviceDetails) {
        throw new Error("Service not found");
      }

      const serviceModel: ServiceModel = {
        id: serviceDetails.props.id,
        service_name: serviceDetails.props.service_name,
        description: serviceDetails.props.description,
      };

      return res
        .status(200)
        .json(ServiceEntityMapper.serviceToJson(serviceModel));
    } catch (error) {
      this.handleError(res, error);
      next(error);
    }
  };
}
