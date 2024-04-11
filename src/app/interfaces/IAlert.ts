import IParameterType from "./IParameterType";
import IStation from "./IStation";

interface IAlert {
    id_alert: number;
    condition: string;
    station_id?: IStation;
    parameter_type_id?: IParameterType;
}

export default IAlert;
