import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStationParameterTable1712670126244 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'station_parameter',
                columns: [
                    {
                        name: 'station_parameter_id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'parameter_type_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'measure_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'station_id',
                        type: 'int',
                        isNullable: false,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('station_parameter');
    }
}
