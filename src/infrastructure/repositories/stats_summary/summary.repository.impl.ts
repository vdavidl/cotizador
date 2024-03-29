import { ServerResponseEntity, SummaryDataSource, SummaryRepository } from "../../../domain";



export class SummaryRepositoryImpl implements SummaryRepository{

    constructor(
        private readonly datasource: SummaryDataSource
    ){}
    showStatsSummary(): Promise <ServerResponseEntity['props']>{
         return this.datasource.showStatsSummary();
    }
}