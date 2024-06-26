import { AppDataSource } from "../../database/data-source";
import Unit from "../entities/Unit";
import IUnit from "../interfaces/IUnit";


const unitRepository = AppDataSource.getRepository(Unit);

const getUnit = async (): Promise<Unit[]> => {
    const unitList = await unitRepository.find();
    return unitList;
} 

const getUnitById = async (id: number): Promise<IUnit | undefined> => {
    const unit = await unitRepository.findOne({
        where: {id_unit: id}
    });

    return unit;
}


const createUnit = async (unit: Unit): Promise<IUnit> => {
    const newUnit = await unitRepository.create(unit);
    unitRepository.save(newUnit)
    return newUnit;
}

const updateUnit = async (id: number, unitData: Partial<IUnit>): Promise<IUnit | undefined> => {
    const existingUnit = await unitRepository.findOne({
        where: {id_unit: id}
    });
  
    if (!existingUnit) {
      return undefined;
    }
  
    const updatedUnit = await unitRepository.save({
      ...existingUnit,
      ...unitData,
    });
  
    return updatedUnit;
  };

const deleteUnit = async (id: number): Promise<IUnit>  => {
    const unit = await unitRepository.findOneOrFail({
        where: {id_unit: id}
    });
    const deletedUnit = await unitRepository.remove(unit);
    return deletedUnit;
}

export {getUnit, getUnitById, createUnit, updateUnit, deleteUnit}
export default unitRepository