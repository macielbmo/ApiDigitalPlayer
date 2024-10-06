import { Module } from '@nestjs/common';
import { ContentWebsiteService } from './content-website.service';
import { ContentWebsiteController } from './content-website.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentWebsite } from './entities/content-website.entity';
import { PlaylistModule } from '../playlist/playlist.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContentWebsite]), PlaylistModule],
  controllers: [ContentWebsiteController],
  providers: [ContentWebsiteService],
})
export class ContentWebsiteModule {}
