import {Request, Response} from 'express'
import { CreateQuotationDto, CustomError, QuotationRepository, QuotationUseCase, ServerResponseEntity, StageDto } from "../../domain";





export class QuotationController{
    constructor(
        private readonly repository: QuotationRepository
    ){}

    private readonly handleError = (res: Response, error: unknown) =>{
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

    showAllQuotations = (req: Request, res: Response) => {
        
        new QuotationUseCase(this.repository)
        .showAllQuotations()
        .then(allQuotations => res.status(201).json(allQuotations))
        .catch(error => this.handleError(res, error))
    }




    createQuotation = (req: Request, res: Response) =>{
        const data = req.body;
        const {stages} = data;
        
        const [errorStage, stageDto_list] = StageDto.createList(stages);
        if(errorStage) return res.status(400).json(ServerResponseEntity.fromObject({
            status: 'error',
            message: 'An error occurred while processing the request.',
            data: null,
            error: errorStage
        }));

        data.stages = stageDto_list;
        const [error, quotationDto] = CreateQuotationDto.create(data);
        if (error) return res.status(400).json(ServerResponseEntity.fromObject({
            status: 'error',
            message: 'An error occurred while processing the request.',
            data: null,
            error: error
        }));

        new QuotationUseCase(this.repository)
        .createQuotation(quotationDto!)
        .then(newQuotation => res.status(201).json({message: "Quotation created successfully", data: newQuotation}))
        .catch(error => this.handleError(res, error))
    }


    showSelectionListData = (req: Request, res: Response) => {
        
        new QuotationUseCase(this.repository)
        .showSelectionListData()
        .then(selectionListData => res.status(201).json(selectionListData))
        .catch(error => this.handleError(res, error))
    }
}