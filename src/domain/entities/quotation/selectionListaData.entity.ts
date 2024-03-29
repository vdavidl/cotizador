import { CustomError } from "../../errors";

interface Prospect{
    id: number,
    organization_name: string,
}

interface Service {
    id: number,
    service_name: string,
}

interface SelectionListProps{
    prospectList:Prospect[],
    serviceList: Service[],
}

export class SelectionListDataEntity{
    constructor(
        public readonly props: SelectionListProps
    ){}

    static fromObject(object: { [key: string]: any }): SelectionListDataEntity{
        const {serviceList, prospectList} = object;
        
        for(const {id, service_name}of serviceList){
            if (!id) throw CustomError.badRequest('id is required');
            if (!service_name) throw CustomError.badRequest('service_name is required');
        }
        for(const {id, organization_name} of prospectList){
            if (!id) throw CustomError.badRequest('id is required');
            if (!organization_name) throw CustomError.badRequest('organization_name is required');
        }

        return new SelectionListDataEntity({
            prospectList: prospectList,
            serviceList: serviceList,
        });
    }
}