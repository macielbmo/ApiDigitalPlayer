import { Injectable } from '@nestjs/common';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private readonly contentService: Repository<Content>,
  ) {}

  create(file: Express.Multer.File, videoDuration: number) {
    const content = new Content();
    content.name = file.originalname;
    content.filename = file.filename;
    content.path = file.path;
    content.type = file.mimetype;
    content.size = file.size;
    content.durantion = videoDuration;

    return this.contentService.save(content);
  }

  findAll() {
    return this.contentService.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} content`;
  }

  update(id: number, updateContentDto: UpdateContentDto) {
    return `This action updates a #${id} content`;
  }

  async remove(id: number) {
    try {
      const content = await this.contentService.findOne({ where: { id: id } });

      if (!content) {
        throw new Error('Content not found');
      }

      return this.contentService.remove(content);
    } catch {
      throw new Error('Failed to delete content');
    }
  }
}
