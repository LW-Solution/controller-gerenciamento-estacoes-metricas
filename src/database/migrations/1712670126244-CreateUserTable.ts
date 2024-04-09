import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

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

        await queryRunner.createForeignKey(
            'station_parameter',
            new TableForeignKey({
                columnNames: ['parameter_type_id'],
                referencedColumnNames: ['id_parameter_type'],
                referencedTableName: 'parameter_type',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'station_parameter',
            new TableForeignKey({
                columnNames: ['measure_id'],
                referencedColumnNames: ['id_measure'],
                referencedTableName: 'measure',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('station_parameter');
    }

}
