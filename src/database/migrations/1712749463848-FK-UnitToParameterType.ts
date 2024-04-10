import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class FKUnitToParameterType1712749463848 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'parameter_type',
            new TableForeignKey({
                columnNames: ['unit_id'],
                referencedColumnNames: ['id_unit'],
                referencedTableName: 'unit',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('parameter_type', 'FK_parameter_type_unit_id');
    }

}
