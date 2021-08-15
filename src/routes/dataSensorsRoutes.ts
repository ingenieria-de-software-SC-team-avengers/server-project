import { Router } from "express";
import * as dataController from "../controllers/dataSensorsController";

const router = Router();

router.post('/dataRegister', dataController.registerTemperature);
router.get('/getTemperatures', dataController.getAllTemperatures);

export default router;