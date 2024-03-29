import { regularExps } from "../../../config";

export class SingUpDto {
    private constructor(
        // public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ) { }
    static create(obj: { [key: string]: any }): [string?, SingUpDto?] {
        const {email, password } = obj

        // if (!name) return ['Missing name'];
        if (!email) return ['Missing email'];
        if (!password) return ['Missing password'];

        if (!regularExps.email.test(email)) return ['Invalid format email'];
        if (!regularExps.password.test(password)) return ['Invalid format password']
        return [undefined, new SingUpDto(email, password)]
    }
}