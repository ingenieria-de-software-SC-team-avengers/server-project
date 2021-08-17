import { Router } from "express";
import * as dataController from "../controllers/dataSensorsController";

const router = Router();

router.post('/dataRegister', dataController.registerTemperature);
router.post('/getTemperatures', dataController.getAllTemperatures);
router.post('/getDataGrafic', dataController.getDataGrafica);
router.post('/getDateGrafic', dataController.getDateGrafica);

export default router;