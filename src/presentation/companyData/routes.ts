import { Router } from "express";
import { CompanyDataSourceImpl } from "../../infrastructure/datasource/company_data";
import { CompanyDataRepositoryImpl } from "../../infrastructure/repositories/companyData";
import { CompanyDataController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";



export class DataCompanyRouter{
    static get router(): Router{
        const routes = Router();
        const dataSource = new CompanyDataSourceImpl();
        const repository = new CompanyDataRepositoryImpl(dataSource);
        const controller = new CompanyDataController(repository);

        routes.get('/all',  AuthMiddleware.validateJWT,controller.showCompanydata);
        routes.post('/create',  AuthMiddleware.validateJWT, controller.createCompanyData);
        routes.put('/edit/:id',  AuthMiddleware.validateJWT, controller.editCompanyData);

        return routes;
    }
}