import { Injectable } from '@nestjs/common';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Screens } from './entities/screen.entity';

@Injectable()
export class ScreensService {
  constructor(
    @InjectRepository(Screens)
    private readonly screenService: Repository<Screens>,
  ) {}
  create(createScreenDto: CreateScreenDto) {
    return this.screenService.save(createScreenDto);
  }

  findAll() {
    return this.screenService.find();
  }

  findOne(id: string) {
    return this.screenService.findOne({ where: { id: id } });
  }

  update(id: string, updateScreenDto: UpdateScreenDto) {
    return `This action updates a #${id} screen`;
  }

  async remove(id: string) {
    const screen = await this.findOne(id);

    if (!screen) {
      throw new Error('Screen not found');
    }

    return this.screenService.remove(screen);
  }
}
