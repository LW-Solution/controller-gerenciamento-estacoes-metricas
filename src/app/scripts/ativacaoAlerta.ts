import StationParameter from '../entities/StationParameter';
import Measure from '../entities/Measure';
import { AppDataSource } from '../../database/data-source';
import Alert from '../entities/Alert';




export async function ativacaoAlert(measure: Measure): Promise<void> {
  const stationParameterRepository = AppDataSource.getRepository(StationParameter);
  const value = measure.value;
  const station_parameter_id = measure.station_parameter.station_parameter_id;


  const stationParameter = await stationParameterRepository.findOne({where:{ station_parameter_id: station_parameter_id }});
  if (stationParameter) {
    const parameterTypeIdParameterType = stationParameter.parameter_type.id_parameter_type;
    const stationIdStation = stationParameter.station.id_station;

    const alertRepository = AppDataSource.getRepository(Alert);

    const alerts = await alertRepository
    .createQueryBuilder("alert")
    .where("alert.stationIdStation = :stationIdStation", { stationIdStation })
    .andWhere("alert.parameterTypeIdParameterType = :parameterTypeIdParameterType", { parameterTypeIdParameterType })
    .getMany();

    alerts.forEach(alert => {
        let operator;
    
        switch (alert.condition) {
            case "Igual a":
                operator = "==";
                break;
            case "Maior que":
                operator = ">";
                break;
            case "Maior ou Igual a":
                operator = ">=";
                break;
            case "Menor que":
                operator = "<";
                break;
            case "Menor ou Igual a":
                operator = "<=";
                break;
            default:
                console.log(`Condition not recognized: ${alert.condition}`);
                break;
        }

        let alertMessage;
    switch (operator) {
        case "==":
            if (value == alert.value) {
                alertMessage = "ALERTA DE MEDIDA";
            }
            break;
        case ">":
            if (value > alert.value) {
                alertMessage = "ALERTA DE MEDIDA";
            }
            break;
        case ">=":
            if (value >= alert.value) {
                alertMessage = "ALERTA DE MEDIDA";
            }
            break;
        case "<":
            if (value < alert.value) {
                alertMessage = "ALERTA DE MEDIDA";
            }
            break;
        case "<=":
            if (value <= alert.value) {
                alertMessage = "ALERTA DE MEDIDA";
            }
            break;
    }

    if (alertMessage) {
        console.log(alertMessage);
    }
    });
}
}