import { ServiceEntity } from '../entities/service.entity';
import { ServiceRepository } from '../repositories/servicios/services.repository';

export interface GetAllServicesUseCase {
 execute(): Promise<ServiceEntity[]>;
}

export class GetAllServicesUseCaseImpl implements GetAllServicesUseCase {
 constructor(private serviceRepository: ServiceRepository) {}

 async execute(): Promise<ServiceEntity[]> {
    return this.serviceRepository.getAllServices();
 }
}