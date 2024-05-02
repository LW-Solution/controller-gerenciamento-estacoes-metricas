import { JsonObject } from "swagger-ui-express";
import { AppDataSource } from "../../database/data-source";
import Measure from "../entities/Measure";
import StationParameter from "../entities/StationParameter";
import IMeasure from "../interfaces/IMeasure";
import IStationParameter from "../interfaces/IStationParameter";


const stationParameter = AppDataSource.getRepository(StationParameter);
const dashBoardRepository = AppDataSource.getRepository(Measure);

const getDahsBoardData = async (id: number): Promise<IStationParameter[]> => {
  const dashBoardList = await stationParameter.find({
    relations: ["station", "parameter_type", "measures"],
  });

  return dashBoardList;
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

  const formattedData: {[key: string]: string | null} = {
        ano: String(date.getFullYear()),
        mes: String(date.getMonth() + 1), // Os meses são indexados de 0 a 11
        data: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
        hora: `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`,
        id_estacao: id_station.toString(),
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
export default dashBoardRepository;