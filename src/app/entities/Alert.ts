import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToMany } from "typeorm";
import ParameterType from "./ParameterType";
import Station from "./Station";
import Occurrence from "./Occurrence";

@Entity('alert')
export default class Alert extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_alert: number;

    @Column()
    condition: string;

    @ManyToOne(() => Station, station => station.alerts)
    station: Station;

    @ManyToOne(() => ParameterType, parameterType => parameterType.alerts)
    parameter_type: ParameterType;

    @OneToMany(() => Occurrence, occurrence => occurrence.alert)
    occurrences: Occurrence[];
}
