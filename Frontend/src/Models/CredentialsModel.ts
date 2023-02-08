class CredentialsModel {
    public username: string;
    public password: string;

    public constructor(user: any) {
        this.username = user.endDate;
        this.password = user.password;
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

export default CredentialsModel;