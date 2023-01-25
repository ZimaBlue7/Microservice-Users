import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createRole } from "./libs/initialSetup.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
createRole();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(userRoutes);

export default app;
