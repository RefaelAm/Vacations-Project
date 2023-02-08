import RoleModel from "./RoleModel";

class UserModel {
    public userId: number;
    public role: RoleModel;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;

    public constructor(user: any) {
        this.userId = user.userId;
        this.role = user.role;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.endDate;
        this.password = user.password;
    }

    public static firstNameValidation = {
        required: { value: true, message: "Missing first name" },
        minLength: { value: 2, message: "First name too short" },
        maxLength: { value: 20, message: "First name too long" }
    }

    public static lastNameValidation = {
        required: { value: true, message: "Missing last name" },
        minLength: { value: 2, message: "Last name too short" },
        maxLength: { value: 20, message: "Last name too long" }
    }

    public static usernameValidation = {
        required: { value: true, message: "Missing username" },
        minLength: { value: 5, message: "Username is too short" },
        maxLength: { value: 20, message: "username is too long" }
    }

    public static passwordValidation = {
        required: { value: true, message: "Missing password" },
        minLength: { value: 5, message: "Password is too short" },
        maxLength: { value: 20, message: "Password is too long" }
    }
}

export default UserModel;
