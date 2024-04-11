import { AppDataSource } from "../../database/data-source";
import Location from "../entities/Location";
import ILocation from "../interfaces/ILocation";

const locationRepository = AppDataSource.getTreeRepository(Location)

const getLocation = (): Promise<ILocation[]> => {
    return locationRepository.find();
}

export {getLocation};