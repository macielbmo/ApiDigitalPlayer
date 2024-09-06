import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileUp } from './models/entities/file.entity';

@Injectable()
export class UploadContentService {
  constructor(
    @InjectRepository(FileUp)
    private filePathRepository: Repository<FileUp>,
  ) {}

  async saveFile(file: Express.Multer.File): Promise<FileUp> {
    const filePath = new FileUp();
    filePath.name = file.originalname;
    filePath.filename = file.filename;
    filePath.path = file.path;

    return this.filePathRepository.save(filePath);
  }
}
