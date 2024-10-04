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
    private readonly playlistService: Repository<Playlist>
  ) {}
  create(createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.save(createPlaylistDto);
  }

  findAll() {
    return this.playlistService.find();
  }

  findOneScreen(screen_id: string) {
    return this.playlistService.find({ 
      where: { screen_id },
      relations: ['content', 'content_website'] 
    })
  }

  findOneScreenContent(screen_id: string, content_id: string) {
    return this.playlistService.find({ where: { screen_id, content_id } });
  }

  async update(id: string, updatePlaylistDto: UpdatePlaylistDto) {
    const content = await this.playlistService.find({ 
      where: { 
        screen_id: id, 
        content_id: updatePlaylistDto.content_id
      }
    });
  
    if (!content || content.length === 0) {
      throw new Error('Playlist not found');
    }
  
    Object.assign(content[0], updatePlaylistDto);
    const savedContent = await this.playlistService.save(content[0]);
  
    return savedContent;
  }

  async updateOrder(screenId: string, updatePlaylistDto: UpdatePlaylistDto[]) {
    if (!updatePlaylistDto || updatePlaylistDto.length === 0) {
      throw new Error('No contents to update');
    }
  
    const results = [];
  
    for (const item of updatePlaylistDto) {
      const content = await this.playlistService.find({ 
        where: { 
          screen_id: screenId, 
          content_id: item.content_id
        }
      });

      console.log(content);
  
      if (!content || content.length === 0) {
        throw new Error(`Content with ID ${item.content_id} not found`);
      }

      content[0].order = item.order;
      const savedContent = await this.playlistService.save(content[0]);
  
      results.push(savedContent);
    }
  
    return results;
  }


  async remove(screen_id: string, content_id: string) {
    const content = await this.findOneScreenContent(screen_id, content_id);

    if (!content) {
      throw new Error('Content not found');
    }

    return this.playlistService.remove(content)
  }
}
