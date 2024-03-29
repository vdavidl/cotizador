import { Router } from "express";
import { ProspectController } from "./controller";
import { ProspectDataSourceImpl, ProspectRepositoryImpl } from '../../infrastructure';
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class ProspectRouter{
    static get router(): Router{
        const routes = Router();
        const datasource = new ProspectDataSourceImpl();
        const repository = new ProspectRepositoryImpl(datasource);
        const controller = new ProspectController(repository);


        routes.get('/all', AuthMiddleware.validateJWT, controller.showAllProspects);
        routes.post('/create', AuthMiddleware.validateJWT, controller.createProspect);
        routes.put('/edit/:prospectId', AuthMiddleware.validateJWT, controller.editProspect);
        routes.get('/details/:prospectId', AuthMiddleware.validateJWT, controller.showProspectDetail);
        routes.get('/getQuotations/:prospectId', AuthMiddleware.validateJWT, controller.showProspectQuotation);
        return routes;
    }
}

