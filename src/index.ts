import express from "express";
import { issueRouter } from "./routes/issue.routes";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use("/api/v1/issue", issueRouter);

app.listen(port, () => console.log(`Server is up and running on port ${port}`));
