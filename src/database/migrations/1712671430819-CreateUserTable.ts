import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUserTable1712671430819 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'alert',
                columns: [
                    {
                        name: 'id_alert',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'condition',
                        type: 'varchar(255)',
                    },
                    {
                        name: 'station_id',
                        type: 'int',
                    },
                    {
                        name: 'parameter_type_id',
                        type: 'int',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'alert',
            new TableForeignKey({
                columnNames: ['station_id'],
                referencedColumnNames: ['id_station'],
                referencedTableName: 'station',
                onDelete: 'CASCADE',
            }),
        );

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
        await queryRunner.dropForeignKey('alert', 'FK_alert_station_id');
        await queryRunner.dropForeignKey('alert', 'FK_alert_parameter_type_id');
        await queryRunner.dropTable('alert');
    }

}
