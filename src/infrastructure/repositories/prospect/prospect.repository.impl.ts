import { ServerResponseEntity, ProspectDataSource, ProspectRepository, IdDto, CreateProspectDto, EditProspectDto} from "../../../domain";


export class ProspectRepositoryImpl implements ProspectRepository{

    constructor(
        private readonly datasource: ProspectDataSource
    ){}

    showAllProspects() : Promise <ServerResponseEntity['props']>{//posibilidad de añadir filtros a la búsqueda como parámetro
        return this.datasource.showAllProspects();
    }

    showProspectDetail(idDto: IdDto): Promise <ServerResponseEntity['props']>{
        return this.datasource.showProspectDetail(idDto);
    }

    createProspect(createProspectDto: CreateProspectDto): Promise<ServerResponseEntity['props']>{
        return this.datasource.createProspect(createProspectDto);
    }
    
    editProspect(prospectId: IdDto, updatedFields:EditProspectDto): Promise<ServerResponseEntity['props']>{
        return this.datasource.editProspect(prospectId, updatedFields);
    }

    showProspectQuotation(prospectId: IdDto): Promise<ServerResponseEntity['props']>{
        return this.datasource.showProspectQuotation(prospectId);
    }
}