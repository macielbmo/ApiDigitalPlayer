import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistService: Repository<Playlist>,
  ) {}
  create(createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.save(createPlaylistDto);
  }

  findAll() {
    return this.playlistService.find();
  }

  findOneScreen(screen_id: string) {
    return this.playlistService.find({ where: { screen_id } })
  }

  findOneScreenContent(screen_id: string, content_id: string) {
    return this.playlistService.find({ where: { screen_id, content_id } });
  }

  update(id: string, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  async remove(screen_id: string, content_id: string) {
    const content = await this.findOneScreenContent(screen_id, content_id);

    if (!content) {
      throw new Error('Content not found');
    }

    return this.playlistService.remove(content)
  }
}
