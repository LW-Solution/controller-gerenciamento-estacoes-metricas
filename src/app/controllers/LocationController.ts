import { Request,Response,Router } from "express";
import Location from "../entities/Location";
import LocationRepository from '../repositories/LocationRepository';
import ILocation from "../interfaces/ILocation";

const locationRouter = Router();

locationRouter.get('/', async (_req: Request, res: Response): Promise<Response>=>{
    const location = await LocationRepository.getLocation();
    return res.status(200).json(location);
});

locationRouter.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const location = await LocationRepository.getLocationById(parseInt(id));
      
      if (!location) {
        return res.status(404).json({ message: 'Location not found' });
      }
  
      return res.status(200).json(location);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  locationRouter.post("/create", async (req: Request, res: Response) => {
    const newStationParameter = {...req.body}

    try{
        const creatingStationParameter = await LocationRepository.createLocation(newStationParameter);
        return res.status(200).json(creatingStationParameter);
    }catch(error){
        return res.status(404).json({ message: "nao foi possivel criar esse parametro da estacao" })
    }
})

export default locationRouter;