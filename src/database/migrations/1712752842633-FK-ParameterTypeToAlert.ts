import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class FKParameterTypeToAlert1712752842633 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'alert',
            new TableForeignKey({
                columnNames: ['parameter_type_id'],
                referencedColumnNames: ['id_parameter_type'],
                referencedTableName: 'parameter_type',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('alert', 'FK_alert_parameter_type_id');
    }
}
