import { Request, Response } from 'express';
import { AuthRepository, CustomError, LoginUseCase, ServerResponseEntity, SingInDto, SingUpDto} from '../../domain/';

export class AuthUserController {
    constructor(
        private readonly repository: AuthRepository
    ) { }

    private readonly handleError = (res: Response, error: unknown) => {
        //Primero se verifica si es un Custom Error
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json(ServerResponseEntity.fromObject({
                status: 'error',
                message: 'An error occurred while processing the request.',
                data: null,
                error: error.message
            }))
        }
        console.log(`${error}`)
        return res.status(500).json({ error: 'Internal server error' })
    }
    
    singIn = (req: Request, res: Response) => {
        const [error, singInDto] = SingInDto.create(req.body)
        if (error) return res.status(400).json(ServerResponseEntity.fromObject({
            status: 'error',
            message: 'An error occurred while processing the request.',
            data: null,
            error: error
        }));
        new LoginUseCase(this.repository)
            .signIn(singInDto!)// afirmación de no nulo (param!) -- se le afirma que el valor no será nulo.
            .then(user => res.status(201).json(user))
            .catch(error => this.handleError(res, error))
    }


    singUp = (req: Request, res: Response) => {
        const [error, singUpDto] = SingUpDto.create(req.body)
        if (error) return res.status(400).json(ServerResponseEntity.fromObject({
            status: 'error',
            message: 'An error occurred while processing the request.',
            data: null,
            error: error
        }));
        new LoginUseCase(this.repository)
            .signUp(singUpDto!)// afirmación de no nulo (param!) -- se le afirma que el valor no será nulo.
            .then(user => res.status(201).json(user))
            .catch(error => this.handleError(res, error))
    }
}   