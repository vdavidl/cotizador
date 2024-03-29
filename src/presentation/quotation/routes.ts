import { Router } from "express";
import { QuotationDataSourceImpl, QuotationRepositoryImpl } from "../../infrastructure";
import { QuotationController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";



export class QuotationRouter{
    static get router(): Router{
        const routes = Router();
        const datasource = new QuotationDataSourceImpl();
        const repository = new QuotationRepositoryImpl(datasource);
        const controller = new QuotationController(repository);

        routes.get('/all', AuthMiddleware.validateJWT, controller.showAllQuotations);
        routes.post('/create', AuthMiddleware.validateJWT, controller.createQuotation);
        routes.get('/create', AuthMiddleware.validateJWT, controller.showSelectionListData);
        //AuthMiddleware.validateJWT,
        return routes;
    }
}