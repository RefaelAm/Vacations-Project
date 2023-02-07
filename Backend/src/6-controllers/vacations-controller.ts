import express, { Request, Response, NextFunction, response } from "express";
import VacationModel from "../4-models/vacation-model";
import vacationsLogic from "../5-logic/vacations-logic";
import logic from "../5-logic/vacations-logic";
import path from "path";
import blockNonLoggedIn from "../3-middleware/block-non-logged-in";

const router = express.Router();

// GET http://localhost:3001/api/vacations
router.get("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        let userId = +request.params.userId;
        if(!userId) userId = 0;
        const vacations = await logic.getAllVacations();
        response.json(vacations)
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/liked-vacations/:userId
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

// GET http://localhost:3001/api/vacations/:vacationId
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

// POST http://localhost:3001/api/vacations
router.post("/vacations",async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image; //body
        const vacation = new VacationModel(request.body);
        const addedVacation = await logic.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// PUT http://localhost:3001/api/vacations/:vacationId
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


// DELETE http://localhost:3001/api/vacations/:vacationId
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

//GET all images:
router.get("/vacations/images/:imageName", async (request:Request, response:Response,next:NextFunction) => {
    try{
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..","1-assets", "images",imageName);
        response.sendFile(absolutePath);
    } catch (err: any) {
        next(err);
    }
    });


    
// GET http://localhost:3001/api/liked-vacations
router.get("/liked-vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const followers = await logic.getAllFollowers();
        response.json(followers)
    }
    catch (err: any) {
        next(err);
    }
});
    
// POST http://localhost:3001/api/liked-vacations
router.post("/liked-vacations",[blockNonLoggedIn], async (request: Request, response: Response, next: NextFunction) => {
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

// DELETE http://localhost:3001/api/liked-vacations
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