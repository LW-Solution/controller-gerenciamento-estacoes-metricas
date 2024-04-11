import { Request,Response,Router } from "express";
import Location from "../entities/Location";
import LocationRepository from '../repositories/LocationRepository';
import ILocation from "../interfaces/ILocation";

const locationRouter = Router();

locationRouter.get('/', async (_req: Request, res: Response): Promise<Response>=>{
    const location = await LocationRepository.getLocation;
    return res.status(200).json(location)
});

export default locationRouter;