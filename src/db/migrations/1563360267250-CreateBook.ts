import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateBook1563360267250 implements MigrationInterface {

    private bookTable = new Table({
        name: 'books',
        columns: [
            {
                name: 'id',
                type: 'INTEGER',
                isPrimary: true,
                isUnique: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'title',
                type: 'varchar',
                length: '255',
                isNullable: false,
            },
            {
                name: 'author_id',
                type: 'INTEGER',
                isNullable: false,
            },
            {
                name: 'created_at',
                type: 'timestamptz',
                isPrimary: false,
                isNullable: false,
                default: 'now()',
            },
            {
                name: 'updated_at',
                type: 'timestamptz',
                isPrimary: false,
                isNullable: false,
                default: 'now()',
            }],
    });

    private foreignKey = new TableForeignKey({
        columnNames: ['author_id'],
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        referencedTableName: 'authors',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(this.bookTable);
      await queryRunner.createForeignKey('books', this.foreignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropTable(this.bookTable);
    }

}
