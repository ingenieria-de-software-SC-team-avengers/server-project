import { Router } from "express";
import * as clinicController from "../controllers/clinicController";

const router = Router();

router.post('/registerClinic', clinicController.resgisterClinic);
router.get('/getClinics', clinicController.getAllClinic);

export default router;