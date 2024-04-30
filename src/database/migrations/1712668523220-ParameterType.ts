import { MigrationInterface, QueryRunner, Table } from "typeorm";

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
                    {
                        name: 'parameter_name',
                        type: 'varchar',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('parameter_type');
    }
}