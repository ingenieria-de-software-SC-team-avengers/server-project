import { Router } from "express";
import * as userControllers from "../controllers/userController";

const router = Router();

router.get('/users', userControllers.getUsers);

export default router;