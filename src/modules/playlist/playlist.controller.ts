import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    console.log(createPlaylistDto);
    return this.playlistService.create(createPlaylistDto);
  }

  @Get()
  findAll() {
    return this.playlistService.findAll();
  }

  @Get(':screen_id')
  findOne(@Param('screen_id') screen_id: string) {
    return this.playlistService.findOneScreen(screen_id);
  }

  @Get('player/:screen_id')
  findContentPlayer(@Param('screen_id') screen_id: string) {
    return this.playlistService.findContentPlayer(screen_id);
  }

  @Patch(':screen_id')
  update(@Param('screen_id') screen_id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    console.log(updatePlaylistDto);
    return this.playlistService.update(screen_id, updatePlaylistDto);
  }

  @Patch('order/:screen_id')
  updateOrder(@Param('screen_id') screen_id: string, @Body() updatePlaylistDto: UpdatePlaylistDto[]) {
    console.log(updatePlaylistDto);
    return this.playlistService.updateOrder(screen_id, updatePlaylistDto);
  }

  @Delete(':screen_id/:content_id')
  remove(
    @Param('screen_id') screen_id: string,
    @Param('content_id') content_id: string,
  ) {
    return this.playlistService.remove(screen_id, content_id);
  }

  @Delete(':content_id')
  removeContent(
    @Param('content_id') content_id: string,
  ) {
    return this.playlistService.removeContent(content_id);
  }
}
