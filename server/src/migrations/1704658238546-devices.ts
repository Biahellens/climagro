import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDeviceAndCommandTables1622586881301 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.createTable(new Table({
            name: "device",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    default: "uuid_generate_v4()",
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false,
                },
            ],
        }), true);

        const table = await queryRunner.getTable("command");
        if (!table) {
            await queryRunner.createTable(new Table({
                name: "command",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "url",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "deviceId",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "userId",
                        type: "uuid",
                        isNullable: false,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["deviceId"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "device",
                        onDelete: "CASCADE",
                    },
                    {
                        columnNames: ["userId"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "user",
                        onDelete: "CASCADE",
                    }
                ],
            }), true);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("command");
        await queryRunner.dropTable("device");
    }
}
