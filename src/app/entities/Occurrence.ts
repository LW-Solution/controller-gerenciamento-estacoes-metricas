import { Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity, Column } from "typeorm";
import Alert from "./Alert";
import Measure from "./Measure";

@Entity('occurrence')
export default class Occurrence  {
    @PrimaryGeneratedColumn()
    id_occurrence: number;

    @Column()
    status_alert: number;

    @ManyToOne(() => Alert, alert => alert.occurrences)
    alert: Alert;

    @ManyToOne(() => Measure, measure => measure.occurrences)
    measure: Measure;
}
