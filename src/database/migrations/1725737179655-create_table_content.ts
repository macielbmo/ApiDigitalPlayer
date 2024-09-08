import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableContent1725737179655 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'content',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'filename',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'path',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        length: '55',
                    },
                    {
                        name: 'durantion',
                        type: 'float4',
                        isNullable: true,
                    },
                    {
                        name: 'size',
                        type: 'int',
                    },
                    {
                        name: 'start_date',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'expiry_date',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('content');
    }

}
