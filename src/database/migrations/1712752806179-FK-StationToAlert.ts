import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class FKStationToAlert1712752806179 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'alert',
            new TableForeignKey({
                columnNames: ['station_id'],
                referencedColumnNames: ['id_station'],
                referencedTableName: 'station',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('alert', 'FK_alert_station_id');
    }
}
