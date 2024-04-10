import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class FKStationParameterToMeasure1712752661049 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'measure',
            new TableForeignKey({
                columnNames: ['station_parameters_id'],
                referencedColumnNames: ['station_parameter_id'],
                referencedTableName: 'station_parameter',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('measure', 'FK_measure_station_parameters_id');
    }
}
