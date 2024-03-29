import { Router } from "express";

import { AuthMiddleware } from "../middlewares/auth.middleware";
import { SummaryDataSourceImpl, SummaryRepositoryImpl } from "../../infrastructure";
import { SummaryController } from "./summary.controller";



export class SummaryRouter{
    static get router(): Router{
        const routes = Router();
        const datasource = new SummaryDataSourceImpl();
        const repository = new SummaryRepositoryImpl(datasource);
        const controller = new SummaryController(repository);

        routes.get('/', AuthMiddleware.validateJWT, controller.showStatsSummary);
        return routes;
    }
}