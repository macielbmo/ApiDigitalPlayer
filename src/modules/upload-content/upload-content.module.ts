import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './models/entities/file.entity';
import { UploadContentService } from './upload-content.service';
import { UploadContentController } from './upload-content.contoller';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [UploadContentController],
  providers: [UploadContentService],
})
export class UploadContentModule {}
