import { CreateProspectDto, EditProspectDto, IdDto, ServerResponseEntity } from "../..";



export abstract class ProspectRepository{
    abstract showAllProspects() : Promise <ServerResponseEntity['props']>;//posibilidad de añadir filtros a la búsqueda como parámetro
    abstract showProspectDetail(idDto: IdDto): Promise <ServerResponseEntity['props']>;
    abstract createProspect(createProspectDto: CreateProspectDto): Promise<ServerResponseEntity['props']>;
    abstract editProspect(prospectId: IdDto, updatedFields:EditProspectDto): Promise<ServerResponseEntity['props']>;
    abstract showProspectQuotation(prospectId: IdDto): Promise<ServerResponseEntity['props']>;
}