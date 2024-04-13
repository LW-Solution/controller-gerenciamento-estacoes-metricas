// Measure.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import StationParameter from "./StationParameter";
import Occurrence from "./Occurrence";

@Entity()
class Measure {
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

export default Measure;
