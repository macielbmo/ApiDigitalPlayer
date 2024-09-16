import { ContentWebsite } from "src/modules/content-website/entities/content-website.entity";
import { Content } from "src/modules/content/entities/content.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

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

    @OneToOne(() => Content)
    @JoinColumn({ name: 'content_id' })
    content: Content;

    @OneToOne(() => ContentWebsite)
    @JoinColumn({ name: 'content_id' })
    content_website: ContentWebsite;
}
