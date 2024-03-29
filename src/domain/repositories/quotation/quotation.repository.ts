import { CreateQuotationDto } from "../../dto";
import { ServerResponseEntity } from "../../server";


export abstract class QuotationRepository{
    abstract showAllQuotations(): Promise<ServerResponseEntity['props']>;
    abstract createQuotation(quotationDto: CreateQuotationDto): Promise<ServerResponseEntity['props']>;
    abstract showSelectionListData(): Promise<ServerResponseEntity['props']>;
}