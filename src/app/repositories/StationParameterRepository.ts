// StationParameterRepository.ts
import { AppDataSource } from "../../database/data-source";
import StationParameter from "../entities/StationParameter";
import IStationParameter from "../interfaces/IStationParameter";
import parameterTypeRepository from "./ParameterTypeRepository";
import stationRepository from "./StationRepository";

const stationParameterRepository = AppDataSource.getRepository(StationParameter);

const getStationParameters = async (): Promise<IStationParameter[]> => {
  const stationParameterList = await stationParameterRepository.find({
    relations: ["parameter_type", "parameter_type.unit", "station"],
  });

  return stationParameterList;
};

const getStationParameterById = async (id: number): Promise<IStationParameter | undefined> => {
  const stationParameter = await stationParameterRepository.findOne({
    where: { station_parameter_id: id },
    relations: ["parameter_type", "parameter_type.unit", "station"],
  });

  return stationParameter;
};


const createStationParameter = async (stationParameter: IStationParameter): Promise<IStationParameter> => {
  const { parameter_type_id, station_id } = stationParameter;

  try {
    const parameterType = await parameterTypeRepository.findOne({
      where: { id_parameter_type: parameter_type_id?.id_parameter_type }
    });

    const station = await stationRepository.findOne({
      where: { id_station: station_id?.id_station }
    });

    if (!parameterType) {
      throw new Error('Tipo de parâmetro não encontrado');
    }

    if (!station) {
      throw new Error('Estação não encontrada');
    }

    const newStationParameter = stationParameterRepository.create({
      parameter_type: parameterType,
      station: station
    });

    await stationParameterRepository.save(newStationParameter);

    return newStationParameter;
  } catch (error) {
    throw new Error(`Erro ao criar parâmetro de estação: ${error}`);
  }
};


  

const updateStationParameter = async (id: number, parameterTypeIdParameterType: number | undefined, stationIdStation: number | undefined): Promise<IStationParameter | undefined> => {
  try {
    const existingStationParameter = await stationParameterRepository.findOne({
      where: { station_parameter_id: id },
      relations: ["parameter_type", "station"], // Carrega as relações com parameter_type e station
    });

    if (!existingStationParameter) {
      return undefined;
    }

    // Verifique se parameterTypeIdParameterType foi fornecido e se é um número
    if (typeof parameterTypeIdParameterType === 'number') {
      existingStationParameter.parameter_type.id_parameter_type = parameterTypeIdParameterType;
    }

    // Verifique se stationIdStation foi fornecido e se é um número
    if (typeof stationIdStation === 'number') {
      existingStationParameter.station.id_station = stationIdStation;
    }

    const updatedStationParameter = await stationParameterRepository.save(existingStationParameter);

    return updatedStationParameter;
  } catch (error) {
    throw new Error(`Erro ao atualizar parâmetro de estação: ${error}`);
  }
};




const deleteStationParameter = async (id: number): Promise<boolean> => {
  const result = await stationParameterRepository.delete(id);
  return !!result.affected;
};

export {
  getStationParameters,
  getStationParameterById,
  createStationParameter,
  updateStationParameter,
  deleteStationParameter,
};
export default stationParameterRepository;
