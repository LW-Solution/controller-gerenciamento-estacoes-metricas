import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class FKLocationToStation1712749066459 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.createForeignKey(
            'station',
            new TableForeignKey({
                columnNames: ['location_id'],
                referencedColumnNames: ['id_location'],
                referencedTableName: 'location',
                onDelete: 'CASCADE', 
            }),
        );
    }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('station', 'FK_station_location_id');
    }

}
