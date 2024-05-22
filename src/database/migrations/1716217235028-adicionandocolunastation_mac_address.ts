import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AdicionandocolunastationMacAddress1716217235028 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('station');
        const isStationMacAddressColumnExists = table.columns.some(c => c.name === 'station_mac_address');

        if (!isStationMacAddressColumnExists) {
            await queryRunner.addColumn('station', new TableColumn({
                name: 'station_mac_address',
                type: 'varchar',
                isNullable: true
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('station');
        const isStationMacAddressColumnExists = table.columns.some(c => c.name === 'station_mac_address');

        if (isStationMacAddressColumnExists) {
            await queryRunner.dropColumn('station', 'station_mac_address');
        }
    }

}