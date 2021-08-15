import { Router } from "express";
import * as clinicController from "../controllers/clinicController";

const router = Router();

router.post('/registerClinic', clinicController.resgisterClinic);

export default router;