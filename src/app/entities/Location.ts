import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import Station from "./Station";

@Entity('location')
export default class Location  {
    @PrimaryGeneratedColumn()
    id_location: number;

    @Column()
    location_name: string;

    @Column()
    coordinate: string;

    @OneToMany(() => Station, station => station.location)
    stations: Station[];
}
