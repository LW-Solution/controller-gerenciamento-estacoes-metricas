import { Router } from "express";
import locationRouter from "../controllers/LocationController";
import parameterTypeRouter from "../controllers/ParameterTypeController";
import stationRouter from "../controllers/StationController";
import StationParameterRouter from "../controllers/StationParameterController";

const routers = Router();

routers.use('/locations', locationRouter);
routers.use('/locations/:id', locationRouter);

//Parametros da estacao:
routers.use('/stationParameter', StationParameterRouter)

//Estacao
routers.use('/station', stationRouter)

//Tipo do Parametro
routers.use('/parameterType', parameterTypeRouter)

export default routers;

