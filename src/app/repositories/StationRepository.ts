import { AppDataSource } from "../../database/data-source";
import Station from "../entities/Station";
import IStation from "../interfaces/IStation";
import locationRepository from "./LocationRepository"; 
import ILocation from "../interfaces/ILocation";

const stationRepository = AppDataSource.getRepository(Station)

const getStation = async (): Promise<IStation[]> => {
    const stationList = await stationRepository.find({
        relations: ["location"], // Carrega a relação com a tabela Location
    });
    return stationList;
} 

const getStationById = async (id: number): Promise<IStation | undefined> => {
    const station = await stationRepository.findOne({
        where: {id_station: id},
        relations: ["location"], // Carrega a relação com a tabela Location
    });

    return station;
}


const createStation = async (station: Station): Promise<IStation> => {
    const newStation = await stationRepository.create(station);
    stationRepository.save(newStation)
    return newStation;
}

const updateStation = async (id: number, station_description: string, locationIdLocation: number | undefined): Promise<IStation | undefined> => {
    try {
      const existingStation = await stationRepository.findOne({
        where: { id_station: id },
        relations: ["location"], // Carrega a relação com a tabela Location
      });
  
      if (!existingStation) {
        return undefined;
      }
  
      // Verifique se o ID da localização foi fornecido
      if (locationIdLocation !== undefined) {
        // Verifique se a localização existe no banco de dados
        const existingLocation = await locationRepository.findOne({ // Correção aqui
          where: { id_location: locationIdLocation }
        });
  
        if (!existingLocation) {
          throw new Error('Localização não encontrada');
        }
  
        existingStation.location = existingLocation;
      }

      // Atualize a descrição da estação, se fornecida
      if (station_description) {
        existingStation.station_description = station_description;
      }
  
      const updatedStation = await stationRepository.save(existingStation);
  
      return updatedStation;
    } catch (error) {
      throw new Error(`Erro ao atualizar estação: ${error}`);
    }
};


const deleteStation = async (id: number): Promise<IStation>  => {
    const station = await stationRepository.findOneOrFail({
        where: {id_station: id}
    });
    const deletedStation = await stationRepository.remove(station);
    return deletedStation;
}

export {createStation, getStation, getStationById, updateStation, deleteStation}
export default stationRepository