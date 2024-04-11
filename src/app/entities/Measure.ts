import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToMany } from "typeorm";
import StationParameter from "./StationParameter";
import Occurrence from "./Occurrence";

@Entity('measure')
export default class Measure extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_measure: number;

    @Column()
    value: number;

    @Column()
    unixtime: number;

    @ManyToOne(() => StationParameter, stationParameter => stationParameter.measures)
    station_parameter: StationParameter;

    @OneToMany(() => Occurrence, occurrence => occurrence.measure)
    occurrences: Occurrence[]; 
}
