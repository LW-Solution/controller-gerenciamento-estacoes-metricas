import { AppDataSource } from "../../database/data-source";
import Measure from "../entities/Measure";
import measure from "../entities/Measure";
import StationParameter from "../entities/StationParameter";
import IMeasure from "../interfaces/IMeasure";
import IStationParameter from "../interfaces/IStationParameter";
import stationParameterRepository from "./StationParameterRepository";


const stationParameter = AppDataSource.getRepository(StationParameter);
const dashBoardRepository = AppDataSource.getRepository(Measure);

const getDahsBoardData = async (id: number): Promise<IStationParameter[]> => {
    const dashBoardList = await stationParameter.find({
        relations: ["station", "parameterType", "measure"], // Inclua aqui as relações necessárias
        where: { station: { id_station: id } }
    });
    

    return dashBoardList;
  };


export default dashBoardRepository;