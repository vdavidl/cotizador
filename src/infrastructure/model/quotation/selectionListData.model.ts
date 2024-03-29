interface ProspectSelectionModel {
    id: number;
    organization_name: string;
}

interface ServiceSelectionModel {
    id: number;
    service_name: string;
}

export interface SelectionListDataModel{
    prospectList: ProspectSelectionModel[],
    serviceList: ServiceSelectionModel[],
}