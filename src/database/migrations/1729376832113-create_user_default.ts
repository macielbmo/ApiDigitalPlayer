import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcrypt';
import { ConfigService } from "@nestjs/config";

export class CreateUserDefault1729376832113 implements MigrationInterface {
    constructor(private readonly configService: ConfigService) {}

    public async up(queryRunner: QueryRunner): Promise<void> {
        const email = process.env.EMAIL
        const password = process.env.PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        await queryRunner.query(`
            INSERT INTO users (email, password, "isActive")
            VALUES ('${email}', '${hashedPassword}', true)
            ON CONFLICT (email) DO NOTHING
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const email = process.env.EMAIL
        await queryRunner.query(`
            DELETE FROM users WHERE email = '${email}'
        `);
    }
}
