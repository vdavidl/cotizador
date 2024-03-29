import { ServerResponseEntity, SingInDto, SingUpDto } from "../..";

export abstract class AuthRepository {
    abstract singIn(singInDto: SingInDto): Promise<ServerResponseEntity['props']>;
    abstract singUp(singUpDto: SingUpDto): Promise<ServerResponseEntity['props']>;
}