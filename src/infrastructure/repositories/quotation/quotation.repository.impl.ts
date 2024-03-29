import { CreateQuotationDto, QuotationDataSource, QuotationRepository, ServerResponseEntity } from "../../../domain";
import { ServerResponseProps } from "../../../domain/server/response.server";




export class QuotationRepositoryImpl implements QuotationRepository{

    constructor(
       private readonly datasource: QuotationDataSource 
    ){}
    showAllQuotations(): Promise<ServerResponseEntity['props']>{
        return this.datasource.showAllQuotations();
    }

    createQuotation(quotationDto: CreateQuotationDto): Promise<ServerResponseEntity['props']>{
        return this.datasource.createQuotation(quotationDto);
    }
    showSelectionListData(): Promise<ServerResponseEntity['props']> {
        return this.datasource.showSelectionListData();
    }
}