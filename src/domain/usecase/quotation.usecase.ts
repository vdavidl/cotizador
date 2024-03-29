
import { CreateQuotationDto } from "../dto";
import { QuotationRepository } from "../repositories";
import { ServerResponseEntity } from "../server";



export class QuotationUseCase{
    constructor(
        private readonly repository: QuotationRepository
    ){}

    async showAllQuotations(): Promise<ServerResponseEntity['props']>{
        return this.repository.showAllQuotations();
    }

    async createQuotation(createQuotation: CreateQuotationDto): Promise<ServerResponseEntity['props']>{
        return this.repository.createQuotation(createQuotation);
    }

    async showSelectionListData(): Promise<ServerResponseEntity['props']>{
        return this.repository.showSelectionListData();
    }
}