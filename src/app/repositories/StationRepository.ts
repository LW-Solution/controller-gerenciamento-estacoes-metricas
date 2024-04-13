import { AppDataSource } from "../../database/data-source";
import Station from "../entities/Station";
import IStation from "../interfaces/IStation";


const stationRepository = AppDataSource.getRepository(Station)

const getStation = async (): Promise<Station[]> => {
    const stationList = await stationRepository.find();
    return stationList;
} 

const getStationById = async (id: number): Promise<IStation | undefined> => {
    const station = await stationRepository.findOne({
        where: {id_station: id}
    });

    return station;
}


const createStation = async (station: Station): Promise<IStation> => {
    const newStation = await stationRepository.create(station);
    stationRepository.save(newStation)
    return newStation;
}

const updateStation = async (station: Station): Promise<IStation> => {
    const idStation = station.id_station;
    let oldStation = await stationRepository.findOneOrFail({
        where: {id_station: idStation}
    })
    oldStation = station;
    const updatedStation = await stationRepository.save(oldStation);
    return updatedStation;
}

const deleteStation = async (id: number): Promise<IStation>  => {
    const station = await stationRepository.findOneOrFail({
        where: {id_station: id}
    });
    const deletedStation = await stationRepository.remove(station);
    return deletedStation;
}

export {createStation, getStation, getStationById, updateStation, deleteStation}