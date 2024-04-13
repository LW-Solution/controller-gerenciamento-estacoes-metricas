import { AppDataSource } from "../../database/data-source";
import ParameterType from "../entities/ParameterType";
import IParameterType from "../interfaces/IParameterType";


const parameterTypeRepository = AppDataSource.getRepository(ParameterType)

const createParameterType = async (parameterType: ParameterType): Promise<IParameterType> => {
    const newParameterType = await parameterTypeRepository.create(parameterType);
    await parameterTypeRepository.save(newParameterType)
    return parameterType;
}

export {createParameterType}