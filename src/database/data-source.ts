import "reflect-metadata"
import { DataSource } from "typeorm"


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
    migrations: [],
    subscribers: [],
})
