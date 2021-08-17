import { Router } from "express";
import * as doctorController from "../controllers/doctorController";

const router = Router();

router.post('/registerDoctor', doctorController.registerDoctor);
router.get('/doctors', doctorController.getAllDoctors);

export default router;