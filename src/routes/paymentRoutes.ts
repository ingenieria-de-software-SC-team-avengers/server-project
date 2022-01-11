import { Router } from "express";
import * as paymentController from "../controllers/paymentController";

const router = Router();

router.get('/payment', paymentController.createPayment);

export default router;