import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1712666717006 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'station',
                columns: [
                    {
                        name: 'id_station',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'station_description',
                        type: 'varchar',
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'location_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'uuid',
                        type: 'varchar',
                        isNullable: true,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('station');
    }
}
