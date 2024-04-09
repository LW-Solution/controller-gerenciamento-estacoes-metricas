import "reflect-metadata"
import { DataSource } from "typeorm"
import {CreateUsersTable1712580060091} from "./migrations/1712580060091-CreateUsersTable"
import { CreateUserTable1712666717006 } from "./migrations/1712666717006-CreateUserTable"
import { CreateUserTable1712666846620 } from "./migrations/1712666846620-CreateUserTable"
import { CreateUserTable1712671430819 } from "./migrations/1712671430819-CreateUserTable"
import { CreateStationParameterTable1712670126244 } from "./migrations/1712670126244-CreateUserTable"
import { CreateUserTable1712671507559 } from "./migrations/1712671507559-CreateUserTable"
import { CreateParameterTypeTable1712670126244 } from "./migrations/1712668523220-CreateUserTable"
import { CreateUserTable1712667878923 } from "./migrations/1712667878923-CreateUserTable"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Topsp808!@",
    database: "estacoes_parametros_db",
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [
        CreateUserTable1712666846620,
        CreateUserTable1712667878923,
        CreateUserTable1712666717006,
        CreateParameterTypeTable1712670126244,
        CreateStationParameterTable1712670126244,
        CreateUserTable1712671430819,
        CreateUserTable1712671507559,
        CreateUsersTable1712580060091,
    ],
    
    subscribers: [],
})
