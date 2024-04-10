import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class FKTypeParameterToParameterSation1712752332485 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'station_parameter',
            new TableForeignKey({
                columnNames: ['parameter_type_id'],
                referencedColumnNames: ['id_parameter_type'],
                referencedTableName: 'parameter_type',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('station_parameter', 'FK_station_parameter_parameter_type_id');
    }
}
