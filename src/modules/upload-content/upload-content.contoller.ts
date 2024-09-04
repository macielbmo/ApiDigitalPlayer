import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadContentService } from './upload-content.service';

@Controller('upload')
export class UploadContentController {
  constructor(private readonly uploadService: UploadContentService) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: '../../../temp/upload',
      filename: (req, file, cb) => {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const savedFile = await this.uploadService.saveFile(file);
    return {
      message: 'File uploaded successfully!',
      file: savedFile,
    };
  }
}
