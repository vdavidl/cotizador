import { BcryptAdapter, JwtAdapter, envs } from '../../../config';
import { prisma } from '../../../data';
import { SingInDto, ServerResponseEntity, SingUpDto, UserEntity } from '../../../domain';
import { AuthDataSource } from '../../../domain/datasource/login/auth.dataSource';
import { CustomError } from '../../../domain/errors';
import { UserEntityMapper } from '../../mappers';

interface UserModelLite {
    id: number;
    email: string;
}
export class AuthDataSourceImpl implements AuthDataSource {

    static userToJson(user: { id: number; email: string; }): UserEntity['props'] {
        return UserEntity.fromObject({
            id: user.id,
            email: user.email,
            // Assuming name and type are not required for this function
        }).props;
    }

    async singIn(singInDto: SingInDto): Promise<ServerResponseEntity['props']> {
        try {
            const {email, password} = singInDto;
            const user = await this.getUserByEmail(email);
            if(!user) throw CustomError.notFound("User not found");

            //Valida la contraseña
            const isPaswordValid = await BcryptAdapter.compare(password, user.password);
            if(!isPaswordValid) throw CustomError.unauthorized("Invalid password");

            //genera el token
            const token = await this.GenerateJWT(user.id);
            const userToEntity = UserEntityMapper.userToJson(user);
            
            return ServerResponseEntity.fromObject({
                message: 'Valid login', 
                status: 'success', 
                data:{user:userToEntity, token}, 
                error: null
            });
        } catch (error) {
            console.log(`${error}`)
            throw CustomError.internalServer("Internal server error")
        }
    }

    async singUp(singUpDto: SingUpDto): Promise<ServerResponseEntity['props']> {
        try {
            const { email, password } = singUpDto;
            const existUser = await this.getUserByEmail(email);
            if (existUser) throw CustomError.badRequest("Email already exist");

            const user = await prisma.user.create({
                data: { 
                    email, 
                    password: BcryptAdapter.hash(password),
                }
            });
            const token = await this.GenerateJWT(user.id);
            const userToEntity = UserEntityMapper.userToJson(user);

            return ServerResponseEntity.fromObject({
                message: 'account created successfully', 
                status: 'success', 
                data: { user: userToEntity,  token }, 
                error: null
            });
        } catch (error) {
            console.log(`${error}`)
            throw CustomError.internalServer("Internal server error");
        }
    }
    private async getUserByEmail(email: string) {
        try {
            const user = await prisma.user.findFirst({ where: { email } })
            return user;
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }
    private async GenerateJWT(id: number) {
        try {
            const token = await JwtAdapter.generateToken({ payload: { id }, seed: envs.JWT_SEED });
            if (!token) throw CustomError.internalServer('Error while creating token')
            return token
        } catch (error) {
            console.log(`${error}`)
            throw CustomError.internalServer("Internal server error")
        }
    }
}
