import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1712671507559 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'occurrence',
                columns: [
                    {
                        name: 'id_occurrence',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'measure_id',
                        type: 'int',
                    },
                    {
                        name: 'alert_id',
                        type: 'int',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('occurrence');
    }
}
