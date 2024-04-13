import { AppDataSource } from "../../database/data-source";
import Occurrence from "../entities/Occurrence";
import IOccurrence from "../interfaces/IOccurrence";


const occurrenceRepository = AppDataSource.getRepository(Occurrence);

const getOccurrence = async (): Promise<Occurrence[]> => {
    const occurrenceList = await occurrenceRepository.find();
    return occurrenceList;
} 

const getOccurrenceById = async (id: number): Promise<IOccurrence | undefined> => {
    const occurrence = await occurrenceRepository.findOne({
        where: {id_occurrence: id}
    });

    return occurrence;
}


const createOccurrence = async (occurrence: Occurrence): Promise<IOccurrence> => {
    const newOccurrence = await occurrenceRepository.create(occurrence);
    occurrenceRepository.save(newOccurrence)
    return newOccurrence;
}

const updateOccurrence = async (occurrence: Occurrence): Promise<IOccurrence> => {
    const idOccurrence = Occurrence.id_occurrence;
    let oldOccurrence = await occurrenceRepository.findOneOrFail({
        where: {id_occurrence: idOccurrence}
    })
    oldOccurrence = occurrence;
    const updatedOccurrence = await occurrenceRepository.save(oldOccurrence);
    return updatedOccurrence;
}

const deleteOccurrence = async (id: number): Promise<IOccurrence>  => {
    const Occurrence = await occurrenceRepository.findOneOrFail({
        where: {id_occurrence: id}
    });
    const deletedOccurrence = await occurrenceRepository.remove(Occurrence);
    return deletedOccurrence;
}

export {getOccurrence, getOccurrenceById, createOccurrence, updateOccurrence, deleteOccurrence}