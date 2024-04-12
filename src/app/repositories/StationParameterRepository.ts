import { AppDataSource } from "../../database/data-source";
import StationParameter from "../entities/StationParameter";
import IStationParameter from "../interfaces/IStationParameter";


const stationParameterRepository = AppDataSource.getRepository(StationParameter)

const getStationParameter = (): Promise<IStationParameter[]> => {
    return stationParameterRepository.find();
} 

const getStationParameterById = async (id: number): Promise<IStationParameter | undefined> => {
    const stationParameter = await stationParameterRepository.findOne({
        where: {station_parameter_id: id}
    });

    return stationParameter;
}

const createStationParameter = async (stationParameter: StationParameter): Promise<IStationParameter> => {
    const newStationParameter = await stationParameterRepository.create(stationParameter);
    stationParameterRepository.save(newStationParameter)
    return newStationParameter;
}

const updateStationParameter = async (stationParameter: StationParameter): Promise<IStationParameter> => {
    const idStation = stationParameter.station_parameter_id;
    let oldStationParameter = await stationParameterRepository.findOneOrFail({
        where: {station_parameter_id: idStation}
    })
    oldStationParameter = stationParameter;
    const updatedStationParameter = await stationParameterRepository.save(oldStationParameter);
    return updatedStationParameter;
}

const deleteStationParameter = async (id: number): Promise<IStationParameter>  => {
    const stationParameter = await stationParameterRepository.findOneOrFail({
        where: {station_parameter_id: id}
    });
    const deletedStationParemeter = await stationParameterRepository.remove(stationParameter);
    return deletedStationParemeter;
}