import { AppDataSource } from "../../database/data-source";
import Measure from "../entities/Measure";
import measure from "../entities/Measure";
import StationParameter from "../entities/StationParameter";
import IMeasure from "../interfaces/IMeasure";
import stationParameterRepository from "./StationParameterRepository";


const measureRepository = AppDataSource.getRepository(measure);

const getMeasures = async (): Promise<IMeasure[]> => {
    const measureList = await measureRepository.find({
      relations: ["station_parameter"], // Inclua aqui as relações necessárias
    });
  
    return measureList;
  };

  const getMeasureById = async (id: number): Promise<IMeasure | undefined> => {
    const measure = await measureRepository.findOne({
      where: { id_measure: id },
      relations: ["station_parameter"], // Inclua aqui as relações necessárias
    });
  
    return measure;
  };


const createMeasure = async (measure: IMeasure): Promise<IMeasure> => {
    const { value, unixtime, station_parameter_id } = measure;
    
    const newMeasure = new Measure();
    newMeasure.value = value;
    newMeasure.unixtime = unixtime;
  
    if (station_parameter_id) {
      const stationParameter = new StationParameter();
      stationParameter.station_parameter_id = station_parameter_id.station_parameter_id;
      newMeasure.station_parameter = stationParameter;
    }
    
    await measureRepository.save(newMeasure);
    
    return {
      id_measure: newMeasure.id_measure,
      value: newMeasure.value,
      unixtime: newMeasure.unixtime,
      station_parameter_id: newMeasure.station_parameter
    };
  };

  const updateMeasure = async (
    id: number,
    value: number | undefined,
    unixtime: number | undefined,
    stationParameterStationParameterId: number | undefined
  ): Promise<IMeasure | undefined> => {
    try {
      const existingMeasure = await measureRepository.findOne({
        where: { id_measure: id },
        relations: ["station_parameter"],
      });
  
      if (!existingMeasure) {
        return undefined;
      }
  
      if (typeof value === 'number') {
        existingMeasure.value = value;
      }
  
      if (typeof unixtime === 'number') {
        existingMeasure.unixtime = unixtime;
      }
  
      if (typeof stationParameterStationParameterId === 'number') {
        // Encontra o StationParameter pelo ID
        const stationParameter = await stationParameterRepository.findOne({
          where: { station_parameter_id: stationParameterStationParameterId },
        });
  
        if (!stationParameter) {
          throw new Error('Parâmetro de estação não encontrado');
        }
  
        // Atribui o StationParameter encontrado
        existingMeasure.station_parameter = stationParameter;
      }
  
      const updatedMeasure = await measureRepository.save(existingMeasure);
  
      return updatedMeasure;
    } catch (error) {
      throw new Error(`Erro ao atualizar medida: ${error}`);
    }
  };
  
  
  
  
  
  
  
  
  
  

const deleteMeasure = async (id: number): Promise<IMeasure>  => {
    const measure = await measureRepository.findOneOrFail({
        where: {id_measure: id}
    });
    const deletedMeasure = await measureRepository.remove(measure);
    return deletedMeasure;
}

export { getMeasureById, createMeasure, updateMeasure, deleteMeasure,getMeasures}
export default measureRepository;