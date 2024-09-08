import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('playlist')
export class Playlist {
    @PrimaryColumn()
    content_id: string;

    @PrimaryColumn()
    screen_id: string;

    @Column()
    type_content: string;

    @Column()
    duration: number;
}
