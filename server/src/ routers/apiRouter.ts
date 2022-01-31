import express from "express";
import { registerView, view } from "../controllers/Controllers";

const apiRouter = express.Router();

apiRouter.get("/data", registerView);
apiRouter.get("/view", view);

export default apiRouter;
