import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class FKMeasureToOccurrence1712753201130 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'occurrence',
            new TableForeignKey({
                columnNames: ['measure_id'],
                referencedColumnNames: ['id_measure'],
                referencedTableName: 'measure',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('occurrence', 'FK_occurrence_measure_id');
    }
}
