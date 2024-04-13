import { AppDataSource } from "../../database/data-source";
import measure from "../entities/Measure";
import IMeasure from "../interfaces/IMeasure";


const measureRepository = AppDataSource.getRepository(measure);

const getMeasure = async (): Promise<measure[]> => {
    const measureList = await measureRepository.find();
    return measureList;
} 

const getMeasureById = async (id: number): Promise<IMeasure | undefined> => {
    const measure = await measureRepository.findOne({
        where: {id_measure: id}
    });

    return measure;
}


const createMeasure = async (measure: measure): Promise<IMeasure> => {
    const newMeasure = await measureRepository.create(measure);
    measureRepository.save(newMeasure)
    return newMeasure;
}

const updateMeasure = async (measure: measure): Promise<IMeasure> => {
    const idMeasure = measure.id_measure;
    let oldMeasure = await measureRepository.findOneOrFail({
        where: {id_measure: idMeasure}
    })
    oldMeasure = measure;
    const updatedMeasure = await measureRepository.save(oldMeasure);
    return updatedMeasure;
}

const deleteMeasure = async (id: number): Promise<IMeasure>  => {
    const measure = await measureRepository.findOneOrFail({
        where: {id_measure: id}
    });
    const deletedMeasure = await measureRepository.remove(measure);
    return deletedMeasure;
}

export {getMeasure, getMeasureById, createMeasure, updateMeasure, deleteMeasure}