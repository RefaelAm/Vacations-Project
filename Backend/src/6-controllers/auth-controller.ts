import express, { Request, Response, NextFunction } from "express";
import UserModel from "../4-models/user-model";
import CredentialsModel from "../4-models/credentials-model";
import authLogic from "../5-logic/auth-logic";
import blockNonLoggedIn from "../3-middleware/block-non-logged-in";

const router = express.Router();

//Register:
router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const token = await authLogic.register(user);
        response.status(201).json(token);
    }
    catch(err: any) {
        next(err);
    }
});


//Login:
router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body);
        const token = await authLogic.login(credentials);
        response.json(token);
    }
    catch(err: any) {
        next(err);
    }
});


//Get one user:
router.get("/users/:userId", blockNonLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        const user = await authLogic.getOneUser(userId);
        response.json(user);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
