import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { ContentController } from '../content/content.controller';
import { ContentService } from '../content/content.service';
import { Content } from '../content/entities/content.entity';
import { ContentWebsite } from '../content-website/entities/content-website.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Content, ContentWebsite])],
  controllers: [PlaylistController, ContentController],
  providers: [PlaylistService, ContentService],
  exports: [PlaylistService],
})
export class PlaylistModule {}
