import { MigrationInterface, QueryRunner, Table } from "typeorm";

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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('alert');
    }
}
