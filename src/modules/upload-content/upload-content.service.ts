import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { File } from './models/entities/file.entity';

@Injectable()
export class UploadContentService {
  constructor(
    @InjectRepository(File)
    private filePathRepository: Repository<File>,
  ) {}

  async saveFile(file: Express.Multer.File): Promise<File> {
    const filePath = new File();
    filePath.name = file.filename;
    filePath.path = file.path;

    return this.filePathRepository.save(filePath);
  }
}
