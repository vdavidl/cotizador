import { CreateProspectDto, EditProspectDto, IdDto } from "../dto";
import { ProspectRepository } from "../repositories";
import { ServerResponseEntity } from "../server";


// export interface CreateProspectUseCase{
//     execute(): Promise<ServerResponseEntity['props']>
// }

// export class ShowAllProspectUseCase implements CreateProspectUseCase{
//     constructor(
//         private readonly repository: ProspectRepository
//     ){}

//     async execute(): Promise<ServerResponseEntity['props']> {
//         return this.repository.showAllProspects();
//     }
// }

export class ProspectUsecase{
    constructor(
        private readonly repository: ProspectRepository
    ){}
    async showAllProspects(): Promise<ServerResponseEntity['props']>{
        return this.repository.showAllProspects();
    }
    async createProspect(createProspectDto: CreateProspectDto): Promise<ServerResponseEntity['props']>{
        return this.repository.createProspect(createProspectDto);
    }
    async editProspect(prospectId: IdDto, updatedFields:EditProspectDto): Promise<ServerResponseEntity['props']>{
        return this.repository.editProspect(prospectId, updatedFields);
    }
    async showProspectDetail(prospectIdDto: IdDto): Promise<ServerResponseEntity['props']>{
        return this.repository.showProspectDetail(prospectIdDto);
    }

    async showProspectQuotation(prospectId: IdDto): Promise<ServerResponseEntity['props']>{
        return this.repository.showProspectQuotation(prospectId);
    }
}