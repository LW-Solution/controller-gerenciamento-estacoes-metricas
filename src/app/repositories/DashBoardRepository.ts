import { JsonObject } from "swagger-ui-express";
import { AppDataSource } from "../../database/data-source";
import StationParameter from "../entities/StationParameter";
import IStationParameter from "../interfaces/IStationParameter";
import Station from "../entities/Station";
import IStation from "../interfaces/IStation";
import ParameterType from "../entities/ParameterType";
import { In } from "typeorm";


const stationParameter = AppDataSource.getRepository(StationParameter);
const dashBoardRepository = AppDataSource.getRepository(Station);
const parameterTypeRepository = AppDataSource.getRepository(ParameterType);

const getDahsBoardData = async (id: number): Promise<JsonObject> => {
  const dashBoardList = await stationParameter.find({
    relations: ["station", "parameter_type", "measures"],
    where: {
      station: {
        id_station: id
      },
    }
  });

  const station = await dashBoardRepository.find({
    relations: ["location"],
    where: { id_station: id },
  });

  // Extrai os IDs dos tipos de parâmetros
  const parameterTypeIds = dashBoardList.map(item => item.parameter_type.id_parameter_type);

  // Consulta os tipos de parâmetros com base nos IDs extraídos
  const parameterTypes = await parameterTypeRepository.find({
    relations: ["unit"],
    where: {
      id_parameter_type: In(parameterTypeIds)
    }
  });

  const formattedData: { [key: string]: any } = {
    id_estacao: station[0],
    measurements: []
  };

  // Mapeia os parâmetros e suas medições
  for (const item of dashBoardList) {
    const paramName = item.parameter_type.description;
    const parameterType = await parameterTypes.find(type => type.id_parameter_type === item.parameter_type.id_parameter_type);
    
    // Itera sobre cada medida
    for (const measure of item.measures) {
      const paramValue = measure.value;
  
      // Obtém a data da medição
      const measureDate = new Date(measure.unixtime * 1000); // Converte o UnixTime em milissegundos
      const measureDateString = `${measureDate.getFullYear()}-${String(measureDate.getMonth() + 1).padStart(2, '0')}-${String(measureDate.getDate()).padStart(2, '0')}`;
      const measureTimeString = `${String(measureDate.getHours()).padStart(2, '0')}:${String(measureDate.getMinutes()).padStart(2, '0')}:${String(measureDate.getSeconds()).padStart(2, '0')}`;
  
      const measurement = {
        description: paramName,
        value: paramValue,
        parameter_type: parameterType,
        data: measureDateString,
        hora: measureTimeString
      };
  
      formattedData.measurements.push(measurement);
    }
  }
  

  return formattedData;
};


const getDahsBoardDataUnixTime = async (unixtime: number, id_station: number): Promise<JsonObject> => {

  const date = new Date(unixtime * 1000);

  const dashBoardList = await stationParameter.find({
    relations: ["station", "parameter_type", "measures"],
    where: {
      station: {
        id_station: id_station
      },
      measures: {
        unixtime,
      },
    }
  });

  const station = await dashBoardRepository.find({
    relations: ["location"],
    where: { id_station: id_station },
  });

  // Extrai os IDs dos tipos de parâmetros
  const parameterTypeIds = dashBoardList.map(item => item.parameter_type.id_parameter_type);

  // Consulta os tipos de parâmetros com base nos IDs extraídos
  const parameterTypes = await parameterTypeRepository.find({
    relations: ["unit"],
    where: {
      id_parameter_type: In(parameterTypeIds)
    }
  });

  const formattedData: { [key: string]: string | any } = {
    ano: String(date.getFullYear()),
    mes: String(date.getMonth() + 1),
    data: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
    hora: `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`,
    id_estacao: station[0],
  };

  // Mapeia os parâmetros e seus valores
  dashBoardList.forEach((item) => {
    const paramName = item.parameter_type.description;
    const paramValue = item.measures[0].value;
    const parameterType = parameterTypes.find(type => type.id_parameter_type === item.parameter_type.id_parameter_type);
    const paramInfo = {
      value: paramValue,
      parameterType: parameterType
    };

    formattedData[paramName] = paramInfo;
  });

  return formattedData;
};



export { getDahsBoardData, getDahsBoardDataUnixTime };
export default stationParameter;