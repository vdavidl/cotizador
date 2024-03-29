import { SummaryRepository } from "../repositories";
import { ServerResponseEntity } from "../server";


export class SummaryUsecase{
    constructor(
        private readonly repository: SummaryRepository
    ){}

    async showStatsSummary(): Promise<ServerResponseEntity['props']>{
        return this.repository.showStatsSummary();
    }
}