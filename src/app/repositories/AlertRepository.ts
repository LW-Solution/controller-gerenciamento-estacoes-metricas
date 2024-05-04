import { AppDataSource } from "../../database/data-source";
import Alert from "../entities/Alert";
import IAlert from "../interfaces/IAlert";
import parameterTypeRepository from "./ParameterTypeRepository";

import StationRepository from "../repositories/StationRepository";
import ParameterTypeRepository from "../repositories/ParameterTypeRepository";
import stationRepository from "../repositories/StationRepository";


const alertRepository = AppDataSource.getRepository(Alert);


const getAlert = async (): Promise<IAlert[]> => {
    const alertList = await alertRepository.find({
        relations: ["parameter_type", "parameter_type.unit", "station"]
    });

    return alertList;
};

const getAlertById = async (id: number): Promise<IAlert | undefined> => {
    const alert = await alertRepository.findOne({
        where: { id_alert: id },
    relations: ["parameter_type", "parameter_type.unit", "station"],
});
    return alert;
};


const createAlert = async (alert: IAlert): Promise<IAlert> => {
    const { condition, description, value, station_id, parameter_type_id } = alert;

    try {
        // Encontre a estação pelo ID
        const station = await stationRepository.findOne({
            where: { id_station: station_id?.id_station }
        });

        if (!station) {
            throw new Error('Estação não encontrada');
        }

        // Encontre o tipo de parâmetro pelo ID
        const parameterType = await parameterTypeRepository.findOne({
            where: { id_parameter_type: parameter_type_id?.id_parameter_type }
        });

        if (!parameterType) {
            throw new Error('Tipo de parâmetro não encontrado');
        }

        const newAlert = alertRepository.create({
            condition: condition,
            description: description,
            value: value,
            station: station,
            parameter_type: parameterType
        });

        await alertRepository.save(newAlert);

        return newAlert;
    } catch (error) {
        throw new Error(`Erro ao criar alerta: ${error}`);
    }
};

const updateAlert = async (id: number, condition: string, description: string, value: number, id_station: number, id_parameter_type: number): Promise<IAlert | undefined> => {
    try {
        const existingAlert = await alertRepository.findOne({
            where: { id_alert: id },
            relations: ["parameter_type", "station"],
        });

        if (!existingAlert) {
            return undefined;
        }

        existingAlert.condition = condition;
        existingAlert.description = description;
        existingAlert.value = value;
        existingAlert.station.id_station = id_station;
        existingAlert.parameter_type.id_parameter_type = id_parameter_type;

        const updatedAlert = await alertRepository.save(existingAlert);

        return updatedAlert;
    } catch (error) {
        throw new Error(`Erro ao atualizar alerta: ${error}`);
    }
};


const deleteAlert = async (id: number): Promise<IAlert>  => {
    const alert = await alertRepository.findOneOrFail({
        where: {id_alert: id}
    });
    const deletedAlert = await alertRepository.remove(alert);
    return deletedAlert;
}

export {getAlert, getAlertById, createAlert, updateAlert, deleteAlert}
export default alertRepository;