import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlteracaoCoordenadasParaLatidutitudeLongitude1714586269833 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('location');
        const isCoordinateColumnExist = table.columns.some(c => c.name === 'coordinate');
        const isLatitudeColumnExist = table.columns.some(c => c.name === 'latitude');
        const isLongitudeColumnExist = table.columns.some(c => c.name === 'longitude');

        if (isCoordinateColumnExist) {
            // Excluir a coluna "coordinate"
            await queryRunner.dropColumn('location', 'coordinate');
        }


        // Adicionar as colunas "latitude" e "longitude"
        if (!isLatitudeColumnExist && !isLongitudeColumnExist) {
            await queryRunner.addColumn(
                'location',
                new TableColumn({
                    name: 'latitude',
                    type: 'varchar',
                    isNullable: false,
                }),
            );

            await queryRunner.addColumn(
                'location',
                new TableColumn({
                    name: 'longitude',
                    type: 'varchar',
                    isNullable: false,
                }),
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverter as alterações na ordem oposta: excluir "latitude" e "longitude" e adicionar "coordinate" novamente
        await queryRunner.dropColumn('location', 'longitude');
        await queryRunner.dropColumn('location', 'latitude');

        await queryRunner.addColumn(
            'location',
            new TableColumn({
                name: 'coordinate',
                type: 'varchar',
                isNullable: false,
            }),
        );
    }
}
