import { CustomError } from '../errors/custom.error'

// export interface ServerResponseProps {
//     status: 'success' | 'error';
//     message: string;
//     data: null | any;
//     error: null | string

// }
export interface ServerResponseProps<T = any> {
    status: "success" | "error";
    message: string;
    data: T | null;
    error: string | null;
    // success: boolean;
  }
  
export class ServerResponseEntity {
    constructor(
        public readonly props: ServerResponseProps
    ) { }
    static fromObject(object: ServerResponseProps): ServerResponseEntity['props'] {
        const { data, error, message, status } = object

        if (!status) throw CustomError.badRequest('status is required for server response');
        if (!['success', 'error'].includes(status)) {
            throw CustomError.badRequest('Invalid status in server response');
        }

        if (!message) throw CustomError.badRequest('message is required for server response');

        return new ServerResponseEntity({
            data, error, message, status
        }).props
    }
}