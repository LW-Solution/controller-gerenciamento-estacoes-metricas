import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class Removendocolunauuid1716217100587 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('station');
        const isUuidColumnExists = table.columns.some(c => c.name === 'uuid');

        if (isUuidColumnExists) {
            await queryRunner.dropColumn('station', 'uuid');
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('station');
        const isUuidColumnExists = table.columns.some(c => c.name === 'uuid');

        if (!isUuidColumnExists) {
            await queryRunner.addColumn('station', new TableColumn({
                name: 'uuid',
                type: 'varchar',
                isUnique: true
            }));
        }
    }

}