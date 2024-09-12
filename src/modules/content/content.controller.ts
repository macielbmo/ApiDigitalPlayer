import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import getVideoDuration from './utils/getVideoDuration';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './temp/upload',
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
  async create(@UploadedFile() file: Express.Multer.File) {
    // Obter a duração do vídeo (somente se for vídeo)
    let videoDuration = null;
    if (file.mimetype === 'video/mp4') {
      videoDuration = await getVideoDuration(file.path);
    }

    console.log('creating file', file);

    // Adicionar a duração ao objeto file
    const savedFile = await this.contentService.create(file, videoDuration);
    return {
      message: 'File uploaded successfully!',
      file: {
        ...savedFile,
        duration: videoDuration, // Adiciona a duração do vídeo (em segundos)
      },
    };
  }

  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentService.update(id, updateContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentService.remove(id);
  }
}
