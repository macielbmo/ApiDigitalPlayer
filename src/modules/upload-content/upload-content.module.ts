import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadContentService } from './upload-content.service';
import { FileUp } from './models/entities/file.entity';
import { UploadContentController } from './upload-content.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FileUp])],
  controllers: [UploadContentController],
  providers: [UploadContentService],
})
export class UploadContentModule {}
