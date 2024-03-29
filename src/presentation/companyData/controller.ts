import {Request, Response} from 'express'
import { CompanyDataDto, CompanyDataRepository, CompanyDataUseCase, CustomError, EditCompanyDataDto, IdDto, ServerResponseEntity } from "../../domain";



export class CompanyDataController{
    constructor(
        private readonly repository: CompanyDataRepository
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



    showCompanydata=(req: Request, res: Response)=>{
        new CompanyDataUseCase(this.repository)
        .showCompanyData()
        .then(allLinesCompanyData => res.status(201).json(allLinesCompanyData))
        .catch(error => this.handlError(res, error))
    }

    createCompanyData = (req: Request, res: Response) =>{
        const [error, createCompanyDataDto] = CompanyDataDto.create(req.body);
        if(error) return res.status(400).json(ServerResponseEntity.fromObject({
            status: 'error',
            message: 'An error occurred while processing the request.',
            data: null,
            error: error
        }));

        new CompanyDataUseCase(this.repository)
        .createCompanyData(createCompanyDataDto!)
        .then(createdCompanyData => res.status(201).json(createdCompanyData))
        .catch(error => this.handlError(res, error))
    }


    editCompanyData=(req: Request, res: Response)=>{
        const [error, companyDataDto]= EditCompanyDataDto.create(req.body);
        const [errorId, idCompanyDataDto] = IdDto.create(req.params.id);

        if (error) return res.status(400).json(ServerResponseEntity.fromObject({
            status: 'error',
            message: 'An error occurred while processing the request.',
            data: null,
            error: error
        }));
        if (errorId) return res.status(400).json(ServerResponseEntity.fromObject({
            status: 'error',
            message: 'An error occurred while processing the request.',
            data: null,
            error: errorId
        }));

        new CompanyDataUseCase(this.repository)
        .editCompanyData(idCompanyDataDto!, companyDataDto!)
        .then(updatedCompanyData => res.status(201).json(updatedCompanyData))
        .catch(error => this.handlError(res, error))
    }

}