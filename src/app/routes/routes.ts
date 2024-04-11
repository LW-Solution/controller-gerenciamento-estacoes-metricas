import { Router } from "express";
import locationRouter from "../controllers/LocationController";

const routers = Router();

routers.use('/locations', locationRouter);

export default routers;

