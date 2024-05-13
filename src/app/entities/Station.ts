import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from "typeorm";
import Location from "./Location";
import StationParameter from "./StationParameter";
import Alert from "./Alert";

@Entity('station')
export default class Station  {
    @PrimaryGeneratedColumn()
    id_station: number;

    @Column({ unique: true })
    station_description: string;

    @Column({ unique: true })
    station_mac_address: string;

    @ManyToOne(() => Location, location => location.stations)
    location: Location;

    @OneToMany(() => StationParameter, stationParameter => stationParameter.station)
    stationParameters: StationParameter[];

    @OneToMany(() => Alert, alert => alert.station)
    alerts: Alert[];

    @Column({ nullable: true })
    uuid: string;
}
