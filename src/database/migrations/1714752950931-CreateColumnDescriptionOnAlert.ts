import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateColumnDescriptionOnAlert1714752950931 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('alert');
        const isDescriptionColumnExist = table.columns.some(c => c.name === 'description');
        const isValueColumnExist = table.columns.some(c => c.name === 'value');

        if (!isDescriptionColumnExist){
            await queryRunner.addColumn(
                'alert',
                new TableColumn({
                    name: 'description',
                    type: 'varchar', 
                    isNullable: true,
                }),
            );
        }
        if (!isValueColumnExist){
            await queryRunner.addColumn(
                'alert',
                new TableColumn({
                    name: 'value',
                    type: 'decimal',
                    isNullable: true,
                }),
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
