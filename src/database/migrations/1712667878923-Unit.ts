import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1712667878923 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'unit',
                columns: [
                    {
                        name: 'id_unit',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'factor',
                        type: 'varchar',
                    }
                    
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('unit');
    }
}
