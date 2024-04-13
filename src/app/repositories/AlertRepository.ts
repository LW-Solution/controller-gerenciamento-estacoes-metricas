import { AppDataSource } from "../../database/data-source";
import Alert from "../entities/Alert";
import IAlert from "../interfaces/IAlert";


const alertRepository = AppDataSource.getRepository(Alert);

const getAlert = async (): Promise<Alert[]> => {
    const alertList = await alertRepository.find();
    return alertList;
} 

const getAlertById = async (id: number): Promise<IAlert | undefined> => {
    const alert = await alertRepository.findOne({
        where: {id_alert: id}
    });

    return alert;
}


const createAlert = async (alert: Alert): Promise<IAlert> => {
    const newAlert = await alertRepository.create(alert);
    alertRepository.save(newAlert)
    return newAlert;
}

const updateAlert = async (alert: Alert): Promise<IAlert> => {
    const idAlert = alert.id_alert;
    let oldAlert = await alertRepository.findOneOrFail({
        where: {id_alert: idAlert}
    })
    oldAlert = alert;
    const updatedAlert = await alertRepository.save(oldAlert);
    return updatedAlert;
}

const deleteAlert = async (id: number): Promise<IAlert>  => {
    const alert = await alertRepository.findOneOrFail({
        where: {id_alert: id}
    });
    const deletedAlert = await alertRepository.remove(alert);
    return deletedAlert;
}

export {getAlert, getAlertById, createAlert, updateAlert, deleteAlert}
