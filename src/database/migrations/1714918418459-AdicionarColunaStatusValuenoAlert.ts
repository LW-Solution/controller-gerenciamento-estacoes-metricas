import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AdicionarColunaStatusValuenoAlert1714918418459
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("occurrence")
    const isStatusAlertColumnExist = table.columns.some(
      (c) => c.name === "status_alert"
    )

    if (!isStatusAlertColumnExist) {
      await queryRunner.addColumn(
        "occurrence",
        new TableColumn({
          name: "status_alert",
          type: "number",
          isNullable: true,
        })
      )
    }
  }
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
