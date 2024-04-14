// IStationParameter.ts

import IParameterType from "./IParameterType";
import IStation from "./IStation";

interface IStationParameter {
  station_parameter_id: number;
  parameter_type_id?: {
    id_parameter_type: number;
  };
  station_id?: {
    id_station: number;
  };
}

export default IStationParameter;
