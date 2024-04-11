import { Router } from "express";
import locationRouter from "../controllers/LocationController";

const routers = Router();

routers.use('/locations', locationRouter);
routers.use('/locations/:id', locationRouter);

export default routers;

