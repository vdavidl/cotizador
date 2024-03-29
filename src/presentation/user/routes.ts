import { Router } from "express";
import { AuthUserController } from "./controller";
import { AuthDataSourceImpl, AuthRepositoryImpl } from '../../infrastructure';//Probablemente implementaciones de las interfaces para fuente de datos y el repositorio para Auth de usuarios.

export class AuthUserRouter {
    static get router(): Router {
        const routes = Router();
        const datasource = new AuthDataSourceImpl();
        const repository = new AuthRepositoryImpl(datasource);
        const controller = new AuthUserController(repository);
  
        routes.post('/signUp', controller.singUp)
        routes.post('/signIn', controller.singIn)
        return routes;
    }
}