import { Request } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../4-models/user-model";
import crypto from "crypto";

const jwtSecretKey = "WhyDidTheyBringBackPalpatine";

function getNewToken(user: UserModel): string {
    delete user.password;
    const container = { user };
    const options = { expiresIn: "3h" };
    const token = jwt.sign(container, jwtSecretKey, options);
    return token;
}

function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            const header = request.header("authorization");
            if (!header) {
                resolve(false);
                return;
            }
            const token = header.substring(7);
            if (!token) {
                resolve(false);
                return;
            }
            jwt.verify(token, jwtSecretKey, err => {
                if (err) {
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        }
        catch (err: any) {
            reject(err);
        }
    });
}
const salt = "ThePrequelsAreBetter";

function hash(plainText: string): string {
    if (!plainText) return null;
    const hashedText = crypto.createHmac("sha512", salt).update(plainText).digest("hex");
    return hashedText;
}

export default {
    getNewToken,
    verifyToken,
    hash
};
