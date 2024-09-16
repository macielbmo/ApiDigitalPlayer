import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('content_website')
export class ContentWebsite {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'varchar', nullable: true })
    url: string;

    @Column({ type: 'text', nullable: true })
    html: string;

    @Column()
    title: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
