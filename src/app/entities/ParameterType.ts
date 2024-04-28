import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToMany } from "typeorm";
import IParameterType from "../interfaces/IParameterType";
import Unit from "./Unit";
import StationParameter from "./StationParameter";
import Alert from "./Alert";

@Entity('parameter_type')
export default class ParameterType implements IParameterType {
    @PrimaryGeneratedColumn()
    id_parameter_type: number;

    @Column()
    description: string;

    @Column()
    factor: number;

    @Column()
    offset: number;

    @ManyToOne(() => Unit, unit => unit.parameterTypes)
    unit: Unit;

    @OneToMany(() => StationParameter, stationParameter => stationParameter.parameter_type)
    stationParameters: StationParameter[];

    @OneToMany(() => Alert, alert => alert.parameter_type)
    alerts: Alert[];
}
