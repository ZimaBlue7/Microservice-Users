import { Router } from "express";
import { signin, signup } from "../controllers/admin.controller";
const router = Router();

router.post("/adminSignup", signup);
router.post("/adminSignin", signin);
