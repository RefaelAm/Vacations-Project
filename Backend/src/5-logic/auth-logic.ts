import { OkPacket } from "mysql";
import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import CredentialsModel from "../4-models/credentials-model";
import { ResourceNotFoundErrorModel, UnauthorizedErrorModel, ValidationErrorModel } from "../4-models/error-models";
import RoleModel from "../4-models/role-model";
import UserModel from "../4-models/user-model";

async function register(user: UserModel): Promise<string> {
    const error = user.validate();
    if (error) throw new ValidationErrorModel(error);
    if (await isUsernameTaken(user.username)) throw new ValidationErrorModel(`Username ${user.username} already taken`);
    user.password = cyber.hash(user.password);
    user.role = RoleModel.User;
    const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)`;
    const result: OkPacket = await dal.execute(sql, [user.role, user.firstName, user.lastName, user.username, user.password]);
    user.userId = result.insertId;
    const token = cyber.getNewToken(user);
    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {
    const error = credentials.validate();
    if (error) throw new ValidationErrorModel(error);
    credentials.password = cyber.hash(credentials.password);
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    const users = await dal.execute(sql, [credentials.username, credentials.password]);
    if (users.length === 0) throw new UnauthorizedErrorModel("Incorrect username or password");
    const user = users[0];
    const token = cyber.getNewToken(user);
    return token;
}

async function isUsernameTaken(username: string): Promise<boolean> {
    const sql = `SELECT COUNT(*) FROM users WHERE username = ?`;
    const count = await dal.execute(sql, [username])[0];
    return count > 0;
}

async function getOneUser(id: number): Promise<UserModel> {
    const sql = `SELECT * FROM users WHERE userId = ?`;
    const users = await dal.execute(sql, [id]);
    if (users.length === 0) throw new ResourceNotFoundErrorModel(id);
    const user = users[0];
    return user;
}

export default {
    register,
    login,
    getOneUser
}