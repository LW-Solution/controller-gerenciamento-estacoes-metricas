import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUserTable1712671507559 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'occurrence',
                columns: [
                    {
                        name: 'measure_id',
                        type: 'int',
                    },
                    {
                        name: 'alert_id',
                        type: 'int',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'occurrence',
            new TableForeignKey({
                columnNames: ['measure_id'],
                referencedColumnNames: ['id_measure'],
                referencedTableName: 'measure',
                onDelete: 'CASCADE',
            }),
        );

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
        await queryRunner.dropForeignKey('occurrence', 'FK_occurrence_measure_id');
        await queryRunner.dropForeignKey('occurrence', 'FK_occurrence_alert_id');
        await queryRunner.dropTable('occurrence');
    }

}
