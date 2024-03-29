import { Router } from 'express';
import { ProspectRouter } from './prospect/routes';
import { DataCompanyRouter } from './companyData/routes';
import { QuotationRouter } from './quotation/routes';
import { AuthUserRouter } from './user/routes';
import { SummaryRouter } from './stats-summary/routes';
import { ServicesRouter } from './servicios/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    // router.use('/api/todos', /*TodoRoutes.routes */ );
    router.use('/api/user/auth', AuthUserRouter.router);

    router.use('/api/prospect', ProspectRouter.router);
    router.use('/api/companyData', DataCompanyRouter.router);
    router.use('/api/quotation', QuotationRouter.router);
    router.use('/api/dashboard', SummaryRouter.router);
    router.use("/api/services", ServicesRouter.router);



    return router;
  }


}

