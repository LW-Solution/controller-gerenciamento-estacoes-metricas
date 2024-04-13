import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class FKStationToParameterType1712751991452 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'station_parameter',
            new TableForeignKey({
                columnNames: ['station_id'],
                referencedColumnNames: ['id_station'],
                referencedTableName: 'station',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('station_parameter', 'FK_station_parameter_station_id');
    }
}
