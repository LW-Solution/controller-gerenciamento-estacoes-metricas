import IUnit from "./IUnit";

export interface IParameterType {
    id_parameter_type?: number;
    description: string;
    factor: number;
    offset: number;
    Unit?: IUnit;
}

export default IParameterType
