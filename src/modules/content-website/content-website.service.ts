import { Injectable } from '@nestjs/common';
import { CreateContentWebsiteDto } from './dto/create-content-website.dto';
import { UpdateContentWebsiteDto } from './dto/update-content-website.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentWebsite } from './entities/content-website.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContentWebsiteService {
  constructor(
    @InjectRepository(ContentWebsite)
    private readonly contentWebsiteRepository: Repository<ContentWebsite>,
  ) {}
  
  create(createContentWebsiteDto: CreateContentWebsiteDto) {
    return this.contentWebsiteRepository.save(createContentWebsiteDto);
  }

  findAll() {
    return this.contentWebsiteRepository.find();
  }

  findOne(id: number) {
    return this.contentWebsiteRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateContentWebsiteDto: UpdateContentWebsiteDto) {
    return `This action updates a #${id} contentWebsite`;
  }

  async remove(id: number) {
    const contentWebsite = await this.findOne(id);

    if (!contentWebsite) {
      throw new Error('Content not found');
    }

    return this.contentWebsiteRepository.remove(contentWebsite)
  }
}
