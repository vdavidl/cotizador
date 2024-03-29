import { Request, Response } from 'express';
import { ProspectRepository, CustomError, ServerResponseEntity, ProspectUsecase, CreateProspectDto, IdDto, EditProspectDto } from '../../domain/';

export class ProspectController{
    constructor(
        private readonly repository: ProspectRepository
    ){}

    private readonly handlError = (res: Response, error: unknown) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json(ServerResponseEntity.fromObject({
                status : 'error',
                message: 'An error ocurred while processing the request.',
                data: null,
                error: error.message
            }))

        }
        console.log(`${error}`)
        return res.status(500).json({error: 'Internal Server Error'})
    }


    private handleValidationError(res: Response, error: string | undefined): Response | undefined {
        if (error) {          
            return res.status(400).json(ServerResponseEntity.fromObject({
                status: 'error',
                message: 'An error occurred while processing the request.',
                data: null,
                error: error
            }));
        }
    }
    

    
    showAllProspects = (req: Request, res: Response) =>{
        
        new ProspectUsecase(this.repository)
        .showAllProspects()
        .then(allprospects => res.status(201).json(allprospects))
        .catch(error => this.handlError(res, error))
    }


    createProspect = (req: Request, res: Response) =>{
        const [error, prospectDto] = CreateProspectDto.create(req.body);
        // if (error) return res.status(400).json(ServerResponseEntity.fromObject({
        //     status: 'error',
        //     message: 'An error occurred while processing the request.',
        //     data: null,
        //     error: error
        // }));
        const errorResponse = this.handleValidationError(res, error);
        if (errorResponse) return errorResponse;

        new ProspectUsecase(this.repository)
        .createProspect(prospectDto!)
        .then(newProspect => res.status(201).json({message: "Prospecto creado exitosamente"}))
        .catch(error => this.handlError(res, error))
    }


    editProspect = (req: Request, res: Response) =>{
        const [errorProspect, prospectDto] = EditProspectDto.create(req.body);
        const [errorId, idDto] = IdDto.create(req.params.prospectId);

        const errorResponse = this.handleValidationError(res, errorId || errorProspect);
        if (errorResponse) return errorResponse;

        new ProspectUsecase(this.repository)
        .editProspect(idDto!, prospectDto!)
        .then(editedProspect => res.status(201).json({message: "Prospecto editado exitosamente"}))
        .catch(error => this.handlError(res, error))
    }


    showProspectDetail = (req: Request, res: Response) =>{
        const id = req.params.prospectId;
        const [error, idDto] = IdDto.create(id);
        const errorResponse = this.handleValidationError(res, error);
        if (errorResponse) return errorResponse;

        new ProspectUsecase(this.repository)
        .showProspectDetail(idDto!)
        .then(prospectDetail => res.status(201).json(prospectDetail))
        .catch(error => this.handlError(res, error))
    }

    showProspectQuotation = (req:Request, res: Response) =>{
        const [error, prospectIdDto] = IdDto.create(req.params.prospectId);
        const errorResponse = this.handleValidationError(res, error);
        if (errorResponse) return errorResponse;

        new ProspectUsecase(this.repository)
        .showProspectQuotation(prospectIdDto!)
        .then(prospectQuotation => res.status(201).json(prospectQuotation))
        .catch(error => this.handlError(res, error))
    }
}
