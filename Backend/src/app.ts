import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import expressRateLimit from "express-rate-limit";
import appConfig from "./2-utils/app-config";
import sanitize from "./2-utils/sanitize";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import authController from "./6-controllers/auth-controller";
import vacationsController from "./6-controllers/vacations-controller";


const server = express();
server.use(cors()); 
server.use(express.json());
server.use("/api/", expressRateLimit({
    max: 50,
    windowMs: 1000, 
    message: "Are you a hacker?" 
}));
server.use(expressFileUpload());
server.use("/api", vacationsController);
server.use("/api", authController);
server.use("*", routeNotFound);
server.use(sanitize);
server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`));

