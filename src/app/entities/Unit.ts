import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import ParameterType from "./ParameterType";

@Entity('unit')
export default class Unit  {
    @PrimaryGeneratedColumn()
    id_unit: number;

    @Column()
    factor: string;

    @OneToMany(() => ParameterType, parameterType => parameterType.unit)
    parameterTypes: ParameterType[];
}
