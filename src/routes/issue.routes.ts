import { Router, Response, Request } from "express";
import { issueController } from "../controllers/issue.controller";

const issueRouter = Router();

issueRouter.post("/", issueController);

export { issueRouter };
