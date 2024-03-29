import { SingInDto, SingUpDto } from "../dto";
import { AuthRepository } from "../repositories";
import { ServerResponseEntity } from "../server";


export interface UserUseCase {
    signUp(singUpDto: SingUpDto): Promise<ServerResponseEntity['props']>
    signIn(signInDto: SingInDto): Promise<ServerResponseEntity['props']>
}

export class LoginUseCase implements UserUseCase {
    constructor(
        private readonly repository: AuthRepository
    ) { }

    async signUp(singUpDto: SingUpDto): Promise<ServerResponseEntity['props']> {
        return this.repository.singUp(singUpDto);
    }

    async signIn(signInDto: SingInDto): Promise<ServerResponseEntity['props']> {
        return this.repository.singIn(signInDto);
    }
}