import { Router } from "express";
import * as consultaController from "../controllers/consultaController";

const router = Router();

router.post('/registrarConsulta', consultaController.registerConsulta);
router.post('/regCon', consultaController.reservarConsulta);

export default router;