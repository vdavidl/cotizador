import { SelectionListDataEntity } from "../../../domain";
import { SelectionListDataModel } from "../../model";




export class SelectionListDataEntityMapper{
    static selectionListToJson(SelectionListData: SelectionListDataModel): SelectionListDataEntity['props']{
        return SelectionListDataEntity.fromObject({
            prospectList: SelectionListData.prospectList,
            serviceList: SelectionListData.serviceList
        }).props;
    }
}
