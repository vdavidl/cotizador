import { UserEntity } from "../../domain";
import { UserModel } from "../model";

export class UserEntityMapper {
    static userToJson(user: UserModel): UserEntity['props'] {

        return UserEntity.fromObject({
            id: user.id,
            // name: user.name,
            email: user.email,
            // type: user.type,
        }).props
    }
}