import { Router } from "express";
import * as consultaController from "../controllers/consultaController";

const router = Router();

router.post('/registrarConsulta', consultaController.registerConsulta);

export default router;