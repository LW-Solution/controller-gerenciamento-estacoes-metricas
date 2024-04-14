import "reflect-metadata"
import dotenv from "dotenv";
import path from "path";
import { DataSource } from "typeorm"

import Alert from "../app/entities/Alert"
import Location from "../app/entities/Location"
import Measure from "../app/entities/Measure"
import Occurrence from "../app/entities/Occurrence"
import ParameterType from "../app/entities/ParameterType"
import Station from "../app/entities/Station"
import StationParameter from "../app/entities/StationParameter"
import Unit from "../app/entities/Unit"
import { CreateUsersTable1712580060091 } from "./migrations/1712580060091-Measure"
import { CreateUserTable1712666717006 } from "./migrations/1712666717006-Station"
import { CreateUserTable1712666846620 } from "./migrations/1712666846620-Location"
import { CreateUserTable1712671430819 } from "./migrations/1712671430819-Alert"
import { CreateStationParameterTable1712670126244 } from "./migrations/1712670126244-StationParemeter"
import { CreateUserTable1712671507559 } from "./migrations/1712671507559-Occurrence"
import { CreateParameterTypeTable1712670126244 } from "./migrations/1712668523220-ParameterType"
import { CreateUserTable1712667878923 } from "./migrations/1712667878923-Unit"
import { FKLocationToStation1712749066459 } from "./migrations/1712749066459-FK-LocationToStation"
import { FKUnitToParameterType1712749463848 } from "./migrations/1712749463848-FK-UnitToParameterType"
import { FKStationToParameterType1712751991452 } from "./migrations/1712751991452-FK-StationToParameterStation"
import { FKTypeParameterToParameterSation1712752332485 } from "./migrations/1712752332485-FK-TypeParameterToParameterSation"
import { FKStationParameterToMeasure1712752661049 } from "./migrations/1712752661049-FK-StationParameterToMeasure"
import { FKStationToAlert1712752806179 } from "./migrations/1712752806179-FK-StationToAlert"
import { FKParameterTypeToAlert1712752842633 } from "./migrations/1712752842633-FK-ParameterTypeToAlert"
import { FKMeasureToOccurrence1712753201130 } from "./migrations/1712753201130-FK-MeasureToOccurrence"
import { FKAlertToOccurrence1712753259171 } from "./migrations/1712753259171-FK-AlertToOccurrence"

const envFile = process.env.NODE_ENV == 'production' ? '.env.prod' : '.env.dev';

dotenv.config({ path: path.resolve(process.cwd(), envFile) });




export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    synchronize: true,
    logging: false,
    entities: [Alert,Location,Measure,Occurrence,ParameterType,Station,StationParameter,Unit],
    migrations: [
        CreateUsersTable1712580060091,
        CreateUserTable1712666717006,
        CreateUserTable1712666846620,
        CreateUserTable1712671430819,
        CreateStationParameterTable1712670126244,
        CreateUserTable1712671507559,
        CreateParameterTypeTable1712670126244,
        CreateUserTable1712667878923,
        FKLocationToStation1712749066459,
        FKUnitToParameterType1712749463848,
        FKStationToParameterType1712751991452,
        FKTypeParameterToParameterSation1712752332485,
        FKStationParameterToMeasure1712752661049,
        FKStationToAlert1712752806179,
        FKParameterTypeToAlert1712752842633,
        FKMeasureToOccurrence1712753201130,
        FKAlertToOccurrence1712753259171

    ],
    
    subscribers: [],
})
