import { Router } from "express";
import { issueCredential } from "../controllers/issue.controller";

const issueRouter = Router();

issueRouter.post("/", issueCredential);

export { issueRouter };
