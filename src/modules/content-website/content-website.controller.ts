import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContentWebsiteService } from './content-website.service';
import { CreateContentWebsiteDto } from './dto/create-content-website.dto';
import { UpdateContentWebsiteDto } from './dto/update-content-website.dto';
import { PlaylistService } from '../playlist/playlist.service';

@Controller('content-website')
export class ContentWebsiteController {
  constructor(
    private readonly contentWebsiteService: ContentWebsiteService,
    private readonly playlistService: PlaylistService,
  ) {}

  @Post()
  create(@Body() createContentWebsiteDto: CreateContentWebsiteDto) {
    return this.contentWebsiteService.create(createContentWebsiteDto);
  }

  @Get()
  findAll() {
    return this.contentWebsiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentWebsiteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentWebsiteDto: UpdateContentWebsiteDto) {
    return this.contentWebsiteService.update(id, updateContentWebsiteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.playlistService.removeContent(id);
    return this.contentWebsiteService.remove(id);
  }
}
