import { AppDataSource } from "../../database/data-source";
import Occurrence from "../entities/Occurrence";
import IOccurrence from "../interfaces/IOccurrence";
import alertRepository from "./AlertRepository";
import measureRepository from "./MeasureRepository";

const occurrenceRepository = AppDataSource.getRepository(Occurrence);

const getOccurrences = async (): Promise<Occurrence[]> => {
    const occurrences = await occurrenceRepository.find({
      relations: ['alert', 'measure']
    });
    return occurrences;
  };
  
  

  const getOccurrenceById = async (id: number): Promise<IOccurrence | undefined> => {
    const occurrence = await occurrenceRepository.findOne({
      where: { id_occurrence: id },
      relations: ['alert', 'measure']
    });
  
    return occurrence;
  };
  
  

const createOccurrence = async (occurrence: IOccurrence): Promise<IOccurrence> => {
    const { alertIdAlert, measureIdMeasure } = occurrence;

    try {
        // Busca o objeto Alert pelo ID
        const alert = await alertRepository.findOne({
            where: { id_alert: alertIdAlert.id_alert }
        });
        if (!alert) {
            throw new Error('Alerta não encontrado');
        }

        // Busca o objeto Measure pelo ID
        const measure = await measureRepository.findOne({
            where: { id_measure: measureIdMeasure.id_measure }
        });
        if (!measure) {
            throw new Error('Medida não encontrada');
        }

        const newOccurrence = new Occurrence();
        newOccurrence.alert = alert;
        newOccurrence.measure = measure;

        await occurrenceRepository.save(newOccurrence);

        return newOccurrence;
    } catch (error) {
        throw new Error(`Erro ao criar ocorrência: ${error}`);
    }
};


const updateOccurrence = async (id: number, updatedOccurrence: IOccurrence): Promise<IOccurrence | undefined> => {
    try {
      const existingOccurrence = await occurrenceRepository.findOne({
        where: { id_occurrence: id },
        relations: ['alert', 'measure']
      });
  
      if (!existingOccurrence) {
        return undefined;
      }
  
      // Verifique se o alerta (alert) foi fornecido na atualização
      if (updatedOccurrence.alertIdAlert) {
        existingOccurrence.alert.id_alert = updatedOccurrence.alertIdAlert.id_alert;
      }
  
      // Verifique se a medida (measure) foi fornecida na atualização
      if (updatedOccurrence.measureIdMeasure) {
        existingOccurrence.measure.id_measure = updatedOccurrence.measureIdMeasure.id_measure;
      }
  
      // Salva e retorna a ocorrência atualizada
      const updated = await occurrenceRepository.save(existingOccurrence);
      return updated;
    } catch (error) {
      throw new Error(`Erro ao atualizar ocorrência: ${error}`);
    }
  };
  

  const deleteOccurrence = async (id: number): Promise<void> => {
    const result = await occurrenceRepository.delete(id);
    return 
  };
  
  

export default { getOccurrences, getOccurrenceById, createOccurrence, updateOccurrence, deleteOccurrence };
