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


  const createLocation = async (location: Location): Promise<ILocation | undefined>=> {
    const newStationParameter = await locationRepository.create(location);
    locationRepository.save(newStationParameter)
    return newStationParameter;
}
  

export default { getLocation, getLocationById, createLocation };
