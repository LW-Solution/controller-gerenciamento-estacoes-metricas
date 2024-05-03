import IUnit from "./IUnit";

export interface IParameterType {
    id_parameter_type?: number;
    description: string;
    factor: number;
    parameter_name: string;
    offset: number;
    Unit?: IUnit;
}

export default IParameterType
