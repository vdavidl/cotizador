import { CustomError } from '../errors/custom.error'
export interface ServiceProps {
    id: number,
    // userID: number #para MOSTRAR el ID del creador del servicio
    service_name: string,
    description: string,
}
export class ServiceEntity {
    constructor(
        public readonly props: ServiceProps
    ) { }
    static fromObject(object: { [key: string]: any }): ServiceEntity {
        const { id, service_name, description} = object;

        if (!id) throw CustomError.badRequest('id is required');
        // if (!userID) throw CustomError.badRequest('userID is required');
        if (!service_name) throw CustomError.badRequest('service_name is required');
        if (!description) throw CustomError.badRequest('description is required');


        return new ServiceEntity({
            id: Number(id),
            // user: user,
            // userID: Number(userID),
            service_name: service_name,
            description: description,
        })
    }
}