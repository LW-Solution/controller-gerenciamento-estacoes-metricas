import { AppDataSource } from "../../database/data-source";
import Station from "../entities/Station";
import IStation from "../interfaces/IStation";


const stationRepository = AppDataSource.getRepository(Station)

const createStation = async (station: Station): Promise<IStation> => {
    const newStation = await stationRepository.create(station);
    stationRepository.save(newStation)
    return newStation;
}

export {createStation}