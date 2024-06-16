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

const getParametersByStationId = async (id:number) => {
  
  const stationWithParameters = await stationRepository.findOne({
    where: {id_station: id},
    relations: ["stationParameters", "stationParameters.parameter_type", 
      "stationParameters.parameter_type.unit", "stationParameters.measures"]
  })

  let listaParameters;

  if(stationWithParameters === null){
     listaParameters = "erro"
    
  }else{
  listaParameters = stationWithParameters.stationParameters.map(parametro => {
    return {
      id_parameter_type: parametro?.parameter_type.id_parameter_type || 0,
      parameter_name: parametro?.parameter_type.parameter_name || "N/A",
      unit: parametro?.parameter_type.unit.unit || "N/A",
      measure: parametro?.measures
    }
  }
  
  )
  }

  return listaParameters;
}


const createStation = async (station: Station): Promise<IStation> => {
  try {
      const newStation = await stationRepository.create(station);
      await stationRepository.save(newStation);
      return newStation;
  } catch (error) {
      console.error('Error creating station:', error);
      throw error;
  }
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

export {createStation, getStation, getStationById, updateStation, deleteStation, getParametersByStationId}
export default stationRepository