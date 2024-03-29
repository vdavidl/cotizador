import{NextFunction, Request, Response} from 'express';
import { CustomError } from '../../domain';
import { JwtAdapter } from '../../config';
import {prisma} from '../../data/postgresql'
import { UserEntityMapper } from '../../infrastructure';




export class AuthMiddleware{
    static async validateJWT(req: Request, res: Response, next: NextFunction){

        const authorization = req.header('Authorization');
        if(!authorization) return res.status(401).json({ error: 'Invalid Bearer token'});

        const token = authorization.split(' ').at(1) || '';

        try {
            const payload = await JwtAdapter.validatedToken<{id: string}>(token)
            if(!payload) return res.status(401).json({error: 'Invalid token'})
            
            const user = await prisma.user.findFirst({where: {id : Number(payload.id)}})
            if(!user) return res.status(401).json({error: 'Invalid token'})

            req.body.user = UserEntityMapper.userToJson(user)
            next()

        } catch (error) {
            throw CustomError.internalServer("Internal server Error")
        }
    }
}