import express from "express";
import { issueRouter } from "./routes/issue.routes";

const app = express();
app.use(express.json());

app.use("/api/v1/issue", issueRouter);

app.listen(3000, () => console.log("Server is up and running on port 3000"));
