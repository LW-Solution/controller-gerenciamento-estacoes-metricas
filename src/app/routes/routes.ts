import { Router } from "express";
import alertRouter from "../controllers/AlertController";
import locationRouter from "../controllers/LocationController";
import parameterTypeRouter from "../controllers/ParameterTypeController";
import stationRouter from "../controllers/StationController";
import StationParameterRouter from "../controllers/StationParameterController";
import unitRouter from "../controllers/UnitController";
import occurrenceRouter from "../controllers/OccurrenceController";
import measureRouter from "../controllers/MeasureController";

const routers = Router();

//Localização
routers.use('/locations', locationRouter);

//Parametros da estacao:
routers.use('/stationParameter', StationParameterRouter)

//Estacao
routers.use('/station', stationRouter)

//Tipo do Parametro
routers.use('/parameterType', parameterTypeRouter)

//Alertas
routers.use('/alert', alertRouter)

//Unidades
routers.use('/unit' , unitRouter)

//Ocorrencias
routers.use('/occurrence', occurrenceRouter)

//Medidas
routers.use('/measure', measureRouter)

export default routers;

