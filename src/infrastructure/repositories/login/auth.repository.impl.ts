import { SingInDto, ServerResponseEntity, SingUpDto, AuthRepository, AuthDataSource } from '../../../domain';
export class AuthRepositoryImpl implements AuthRepository {
    constructor(
        private readonly datasource: AuthDataSource
    ) { }
    singIn(singInDto: SingInDto): Promise<ServerResponseEntity['props']> {
        return this.datasource.singIn(singInDto);
    }
    singUp(singUpDto: SingUpDto): Promise<ServerResponseEntity['props']> {
        return this.datasource.singUp(singUpDto);
    }
}