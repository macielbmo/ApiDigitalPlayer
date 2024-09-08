import { Module } from '@nestjs/common';
import { ContentWebsiteService } from './content-website.service';
import { ContentWebsiteController } from './content-website.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentWebsite } from './entities/content-website.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentWebsite])],
  controllers: [ContentWebsiteController],
  providers: [ContentWebsiteService],
})
export class ContentWebsiteModule {}
