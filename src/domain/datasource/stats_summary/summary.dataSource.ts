import { ServerResponseEntity } from "../../server";


export abstract class SummaryDataSource{
    abstract showStatsSummary(): Promise <ServerResponseEntity['props']>;

}