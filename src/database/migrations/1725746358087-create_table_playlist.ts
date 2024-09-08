import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTablePlaylist1725746358087 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
           new Table({
            name: 'playlist',
            columns: [
                {
                    name: 'screen_id',
                    type: 'uuid',
                },
                {
                    name: 'content_id',
                    type: 'uuid',
                },
                {
                    name: 'type_content',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'duration',
                    type: 'integer',
                    isNullable: true,
                }
            ]
           }), true)

            await queryRunner.createForeignKey('playlist', new TableForeignKey({
                columnNames: ['screen_id'],
                referencedTableName: 'screens',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('playlist');
        const foreignKeys = table.foreignKeys.filter(fk => fk.columnNames.indexOf('screen_id') !== -1);
        await queryRunner.dropForeignKeys('playlist', foreignKeys);
        await queryRunner.dropTable('playlist');
    }

}
