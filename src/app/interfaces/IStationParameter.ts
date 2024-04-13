import IParameterType from "./IParameterType"
import IStation from "./IStation";

interface IStationParameter {
    station_parameter_id: number;
    parameter_type_id?: IParameterType;
    station_id?: IStation;
}

export default IStationParameter;
