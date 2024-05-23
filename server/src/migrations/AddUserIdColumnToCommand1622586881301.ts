import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddUserIdColumnToCommand1622586881301 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("command", new TableColumn({
            name: "userId",
            type: "uuid",
            isNullable: false,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("command", "userId");
    }
}
