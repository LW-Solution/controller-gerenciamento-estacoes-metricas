import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AdicionandoColunaParameterType1714325746698 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'parameter_type',
            new TableColumn({
                name: 'description',
                type: 'varchar', 
                isNullable: false,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('parameter_type', 'description');
    }

} 