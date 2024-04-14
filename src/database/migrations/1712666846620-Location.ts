import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1712666846620 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'location',
                columns: [
                    {
                        name: 'id_location',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'location_name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'coordinate',
                        type: 'varchar',
                        isNullable: false,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('location');
    }
}
