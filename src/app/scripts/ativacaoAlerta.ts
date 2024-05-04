import StationParameter from '../entities/StationParameter';
import Measure from '../entities/Measure';
import { AppDataSource } from '../../database/data-source';
import Alert from '../entities/Alert';
import Station from '../entities/Station';
import ParameterType from '../entities/ParameterType';
import Unit from '../entities/Unit';



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
    .andWhere("alert.value > :value", { value })
    .getMany();
    
    const filteredAlerts = alerts.filter(alert =>
        alert.station.id_station === stationIdStation &&
        alert.parameter_type.id_parameter_type === parameterTypeIdParameterType
    );



    
  } else {
    console.error(`StationParameter com ID ${station_parameter_id} não encontrado`);
  }
}

function MoreThan(value: number): number | import("typeorm").FindOperator<number> {
    throw new Error('Function not implemented.');
}
