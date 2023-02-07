import Joi from "joi";
import RoleModel from "./role-model";


class UserModel {
    public userId: number;
    public role: RoleModel;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;

    public constructor (user: UserModel) {
        this.userId = user.userId;
        this.role = user.role;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
    }

    public static validationSchema = Joi.object({
        userId: Joi.number().forbidden().integer().positive(),
        role: Joi.forbidden(), // check later...
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        username: Joi.string().required().min(5).max(20),
        password: Joi.string().required().min(5).max(20)
    });

    public validate(): string {
        const result = UserModel.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default UserModel;