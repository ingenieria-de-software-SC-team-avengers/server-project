import { Router } from "express";
import * as doctorController from "../controllers/doctorController";

const router = Router();

router.post('/registerDoctor', doctorController.registerDoctor);

export default router;