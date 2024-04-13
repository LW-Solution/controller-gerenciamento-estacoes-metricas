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
        return res.status(404).json({ message: "nao foi possivel criar esse parametro da Location" })
    }
})

locationRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { location_name, coordinate } = req.body;

  try {
    const updatedLocation = await LocationRepository.updateLocation(parseInt(id), {
      location_name,
      coordinate,
    });

    if (!updatedLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }

    return res.status(200).json(updatedLocation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

locationRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedLocation = await LocationRepository.deleteLocation(parseInt(id));

    if (!deletedLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }

    return res.status(200).json({ message: 'Location deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default locationRouter;