import { Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity, OneToMany } from "typeorm";
import ParameterType from "./ParameterType";
import Station from "./Station";
import Measure from "./Measure";

@Entity('station_parameter')
export default class StationParameter  {
    @PrimaryGeneratedColumn()
    station_parameter_id: number;

    @ManyToOne(() => ParameterType, parameterType => parameterType.stationParameters)
    parameter_type: ParameterType;

    @ManyToOne(() => Station, station => station.stationParameters)
    station: Station;

    @OneToMany(() => Measure, measure => measure.station_parameter)
    measures: Measure[];
}
