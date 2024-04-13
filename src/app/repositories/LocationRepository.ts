import { AppDataSource } from "../../database/data-source";
import Location from "../entities/Location";
import ILocation from "../interfaces/ILocation";

const locationRepository = AppDataSource.getTreeRepository(Location);

const getLocation = (): Promise<ILocation[]> => {
  return locationRepository.find();
};

const getLocationById = async (id: number): Promise<ILocation | undefined> => {
    const location = await locationRepository.findOne({
      where: { id_location: id },
    });
    return location;
  };

<<<<<<< HEAD
  const createLocation = async (locationData: ILocation): Promise<ILocation> => {
    const newLocation = locationRepository.create(locationData);
    return await locationRepository.save(newLocation);
  };
=======

  const createLocation = async (location: Location): Promise<ILocation | undefined>=> {
    const newStationParameter = await locationRepository.create(location);
    locationRepository.save(newStationParameter)
    return newStationParameter;
}
>>>>>>> cf4b12961d496de1b1bddbb07ecfd7d5d1191ce4
  

export default { getLocation, getLocationById, createLocation };
