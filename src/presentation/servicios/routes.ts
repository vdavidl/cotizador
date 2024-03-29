import { Router } from "express";
import { ServiceController } from "./controller";
import { ServiceRepositoryImpl } from "../../infrastructure/repositories/servicios/service.repository.impl";
import { ServiceDataSourceImpl } from "../../infrastructure/datasource/servicios/services.datasource.impl";
import { AuthMiddleware } from "../middlewares/auth.middleware";
// import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export class ServicesRouter {
    static get router(): Router {
      const routes = Router();
      const serviceDataSource = new ServiceDataSourceImpl();
      const serviceRepository = new ServiceRepositoryImpl(serviceDataSource);
      const serviceController = new ServiceController(serviceRepository);
  
      routes.get("/all",AuthMiddleware.validateJWT, serviceController.getServices);
      routes.post("/create",AuthMiddleware.validateJWT, serviceController.createService);
      routes.get("/detail/:id",AuthMiddleware.validateJWT, serviceController.getServiceDetails);
      return routes;
    }
  }
  

