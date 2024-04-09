import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateParameterTypeTable1712670126244 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'parameter_type',
                columns: [
                    {
                        name: 'id_parameter_type',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'unit_id',
                        type: 'int',
                    },
                    {
                        name: 'factor',
                        type: 'float',
                    },
                    {
                        name: 'offset',
                        type: 'float',
                    },
                ],
            }),
        );

        
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
        await queryRunner.dropTable('parameter_type');
    }

}
