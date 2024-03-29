import { regularExps } from "../../../config";

export class SingInDto {
    private constructor(
        public readonly email: string,
        public readonly password: string
    ) { }
    static create(obj: { [key: string]: any }): [string?, SingInDto?] {
        const { email, password } = obj
        if (!email) return ['Missing email'];
        
        if (!password) return ['Missing password'];

        if (!regularExps.email.test(email)) return ['Invalid format email'];
        if (!regularExps.password.test(password)) return ['Invalid format password']
        return [undefined, new SingInDto(email, password)]
    }
}