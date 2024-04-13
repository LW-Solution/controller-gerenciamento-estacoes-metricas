import IStationParameter from "./IStationParameter";

interface IMeasure {
    id_measure: number;
    value: number;
    unixtime: number;
    station_parameter_id?: IStationParameter;
}

export default IMeasure;
