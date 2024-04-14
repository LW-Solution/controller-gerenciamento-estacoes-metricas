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

const updateLocation = async (id: number, updatedLocationData: ILocation): Promise<ILocation | undefined> => {
  const locationToUpdate = await locationRepository.findOne({
    where: {id_location: id}
  });

  if (!locationToUpdate) {
    return undefined;
  }

  const updatedLocation = {
    ...locationToUpdate,
    ...updatedLocationData,
  };

  return locationRepository.save(updatedLocation);
};

const deleteLocation = async (id: number): Promise<boolean> => {
  const locationToDelete = await locationRepository.findOne({
    where: {id_location: id}
  });

  if (!locationToDelete) {
    return false;
  }

  await locationRepository.remove(locationToDelete);
  return true;
};
  

export  { getLocation, getLocationById, createLocation, updateLocation, deleteLocation };
export default locationRepository;
