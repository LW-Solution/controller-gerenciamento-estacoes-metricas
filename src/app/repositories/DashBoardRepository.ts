import { AppDataSource } from "../../database/data-source";
import Measure from "../entities/Measure";
import StationParameter from "../entities/StationParameter";
import IMeasure from "../interfaces/IMeasure";
import IStationParameter from "../interfaces/IStationParameter";


const stationParameter = AppDataSource.getRepository(StationParameter);
const dashBoardRepository = AppDataSource.getRepository(Measure);

const getDahsBoardData = async (id: number): Promise<IStationParameter[]> => {
    // const dashBoardList = await stationParameter.find({
    //     relations: ["station", "parameter_type", "measures"],
    // });
    
    const dashBoardList = await stationParameter
    .createQueryBuilder("stationParameter")
    .innerJoinAndSelect("stationParameter.station", "station")
    .innerJoinAndSelect("stationParameter.parameter_type", "parameter_type")
    .leftJoinAndSelect("stationParameter.measures", "measure")
    .getMany();

  dashBoardRepository.createQueryBuilder().select("station_parameter_id").from(StationParameter, "station_parameter").getMany();

    return dashBoardList;
  };

export { getDahsBoardData };
export default dashBoardRepository;