import { CustomError, ServerResponseEntity, SummaryRepository, SummaryUsecase } from "../../domain";
import {Request, Response} from 'express';




export class SummaryController{
    constructor(
        private readonly repository: SummaryRepository
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

    showStatsSummary = (req: Request, res: Response) =>{
        new SummaryUsecase(this.repository)
        .showStatsSummary()
        .then(statsSummary => res.status(201).json(statsSummary))
        .catch(error => this.handlError(res, error))
    }


}