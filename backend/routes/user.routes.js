import { Router } from "express";
import { regitser } from "../controllers/user.controller.js";

const router = Router();

router.route('/register').post(regitser);

export default router;