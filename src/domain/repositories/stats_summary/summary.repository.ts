import { ServerResponseEntity } from "../../server";


export abstract class SummaryRepository{
    abstract showStatsSummary(): Promise <ServerResponseEntity['props']>;
}