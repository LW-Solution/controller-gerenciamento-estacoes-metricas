import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateColumnDescriptionOnAlert1714752950931 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('alert');
        const isDescriptionColumnExist = table.columns.some(c => c.name === 'description');
        
        if (!isDescriptionColumnExist) {
            
        
            await queryRunner.addColumn(
                'alert',
                new TableColumn({
                    name: 'description',
                    type: 'varchar', 
                    isNullable: true,
                }),
            );
        }
        

       
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('alert', 'description');
    }

}
