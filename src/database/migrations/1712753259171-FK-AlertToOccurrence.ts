import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class FKAlertToOccurrence1712753259171 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'occurrence',
            new TableForeignKey({
                columnNames: ['alert_id'],
                referencedColumnNames: ['id_alert'],
                referencedTableName: 'alert',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('occurrence', 'FK_occurrence_alert_id');
    }
}
