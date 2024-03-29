import { CustomError } from '../errors/custom.error'
interface UserProps {
    id: number,
    // name: string,
    email: string,
}
export class UserEntity {
    constructor(
        public readonly props: UserProps
    ) { }
    static fromObject(object: { [key: string]: any }): UserEntity {
        const { id, email} = object

        if (!id) throw CustomError.badRequest('id is required');
        // if (!name) throw CustomError.badRequest('name is required');
        if (!email) throw CustomError.badRequest('email is required');

        return new UserEntity({
            email: email,
            id: Number(id),
        })
    }
}