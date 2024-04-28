import { AppDataSource } from "../../database/data-source";
import ParameterType from "../entities/ParameterType";
import IParameterType from "../interfaces/IParameterType";
import IUnit from "../interfaces/IUnit";
import unitRepository from "./UnitRepository";

const parameterTypeRepository = AppDataSource.getRepository(ParameterType);

const getParameterTypes = async (): Promise<IParameterType[]> => {
  const parameterTypeList = await parameterTypeRepository.find({
    relations: ["unit"], // Carrega a relação com a tabela Unit
  });

  return parameterTypeList.map((parameterType) => ({
    id_parameter_type: parameterType.id_parameter_type,
    unitIdUnit: parameterType.unit ? parameterType.unit.id_unit : null,
    description: parameterType.description,
    factor: parameterType.factor,
    offset: parameterType.offset,
  }));
};

const getParameterTypeById = async (id: number): Promise<IParameterType | undefined> => {
  const parameterType = await parameterTypeRepository.findOne({
    where: { id_parameter_type: id },
    relations: ["unit"], // Carrega a relação com a tabela Unit
  });

  if (!parameterType) {
    return undefined;
  }

  const parameterTypeData = {
    id_parameter_type: parameterType.id_parameter_type,
    unitIdUnit: parameterType.unit ? parameterType.unit.id_unit : null,
    description: parameterType.description,
    factor: parameterType.factor,
    offset: parameterType.offset,
  } as IParameterType;

  return parameterTypeData;
};



const createParameterType = async (parameterType: ParameterType): Promise<IParameterType> => {
  // Certifique-se de que o id_unit passado existe no banco de dados
  const { id_unit } = parameterType.unit;

  // Encontre a unidade com o id correspondente
  const unit = await unitRepository.findOne({
    where: { id_unit: id_unit }
  });

  // Se a unidade não existir, retorne um erro ou lide com isso adequadamente
  if (!unit) {
    throw new Error('Unidade não encontrada');
  }

  // Associe a unidade ao novo tipo de parâmetro
  parameterType.unit = unit;

  // Crie o novo tipo de parâmetro
  const newParameterType = await parameterTypeRepository.create(parameterType);
  await parameterTypeRepository.save(newParameterType);

  return newParameterType;
};

const updateParameterType = async (id: number, unitIdUnit: number | undefined, description: string | undefined, factor: number | undefined, offset: number | undefined): Promise<IParameterType | undefined> => {
  try {
    const existingParameterType = await parameterTypeRepository.findOne({
      where: { id_parameter_type: id },
      relations: ["unit"], // Carrega a relação com a tabela Unit
    });

    if (!existingParameterType) {
      return undefined;
    }

    // Verifique se o parâmetro unit foi fornecido
    if (unitIdUnit !== undefined) {
      // Verifique se a unidade existe no banco de dados
      const existingUnit = await unitRepository.findOne({
        where: { id_unit: unitIdUnit }
      });

      if (!existingUnit) {
        throw new Error('Unidade não encontrada');
      }

      existingParameterType.unit = existingUnit;
    }

    // Atualize as propriedades se elas foram fornecidas
    if (factor !== undefined) {
      existingParameterType.factor = factor;
    }

    if (description !== undefined) {
      existingParameterType.description = description;
    }

    if (offset !== undefined) {
      existingParameterType.offset = offset;
    }

    const updatedParameterType = await parameterTypeRepository.save(existingParameterType);

    return updatedParameterType;
  } catch (error) {
    throw new Error(`Erro ao atualizar parâmetro do Tipo Parâmetro: ${error}`);
  }
};


const deleteParameterType = async (id: number): Promise<IParameterType | undefined> => {
  const parameterType = await parameterTypeRepository.findOne({
    where: { id_parameter_type: id }
  });

  if (!parameterType) {
    return undefined;
  }

  const deletedParameterType = await parameterTypeRepository.remove(parameterType);
  return deletedParameterType;
};

export {
  getParameterTypes,
  getParameterTypeById,
  createParameterType,
  updateParameterType,
  deleteParameterType
};

export default parameterTypeRepository;
