import express, { NextFunction, Request, Response } from "express";
import path from "path";
import blockNonLoggedIn from "../3-middleware/block-non-logged-in";
import VacationModel from "../4-models/vacation-model";
import { default as logic, default as vacationsLogic } from "../5-logic/vacations-logic";

const router = express.Router();
router.get("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        let userId = +request.params.userId;
        if (!userId) userId = 0;
        const vacations = await logic.getAllVacations();
        response.json(vacations)
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/liked-vacations/:userId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        const likedVacations = await logic.getLikedVacationsByUser(userId);
        response.json(likedVacations)
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/vacations/:vacationId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const vacation = await logic.getOneVacation(vacationId);
        response.json(vacation)
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addedVacation = await logic.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

router.put("/vacations/:vacationId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        request.body.vacationId = vacationId;
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationsLogic.updateVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/vacations/:vacationId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        await vacationsLogic.deleteVacation(vacationId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);
        response.sendFile(absolutePath);
    } catch (err: any) {
        next(err);
    }
});

router.get("/liked-vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const followers = await logic.getAllFollowers();
        response.json(followers)
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/liked-vacations", [blockNonLoggedIn], async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.body.userId;
        const vacationId = +request.body.vacationId;
        const likedVacation = await logic.addFollower(userId, vacationId);
        response.status(201).json(likedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/liked-vacations/:vacationId/:userId", [blockNonLoggedIn], async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const userId = +request.params.userId;
        await vacationsLogic.deleteFollower(vacationId, userId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;