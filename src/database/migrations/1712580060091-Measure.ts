import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1712580060091 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'measure',
                columns: [
                    {
                        name: 'id_measure',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'value',
                        type: 'decimal',
                    },
                    {
                        name: 'unixtime',
                        type: 'int',
                    },
                    {
                        name: 'station_parameters_id',
                        type: 'int',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('measure');
    }
}
