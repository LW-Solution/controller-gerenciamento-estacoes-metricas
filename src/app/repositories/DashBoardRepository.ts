import { JsonObject } from "swagger-ui-express";
import { AppDataSource } from "../../database/data-source";
import StationParameter from "../entities/StationParameter";
import IStationParameter from "../interfaces/IStationParameter";
import Station from "../entities/Station";
import IStation from "../interfaces/IStation";


const stationParameter = AppDataSource.getRepository(StationParameter);
const dashBoardRepository = AppDataSource.getRepository(Station);

const getDahsBoardData = async (id: number): Promise<IStation[]> => {
  const dashBoardList = await stationParameter.find({
    relations: ["station", "parameter_type", "measures"],
  });

  const test = await dashBoardRepository.find({
    relations: ["location"],
    where: { id_station: id },
  });

  return test;
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

  const formattedData: {[key: string]: string | any} = {
    ano: String(date.getFullYear()),
    mes: String(date.getMonth() + 1), // Os meses são indexados de 0 a 11
    data: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
    hora: `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`,
    id_estacao: station[0],
  };

  // Mapeia os parâmetros e seus valores
  dashBoardList.forEach((item) => {
    const paramName = item.parameter_type.description;
    const paramValue = (item.measures.length > 0) ? `${item.measures[0].value * item.parameter_type.factor + item.parameter_type.offset}` : null;
    formattedData[paramName] = paramValue;
  });

  return formattedData;
};

export { getDahsBoardData, getDahsBoardDataUnixTime };
export default stationParameter;