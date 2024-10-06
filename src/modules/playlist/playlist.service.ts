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

  async findContentPlayer(screen_id: string) {
    const data = await this.playlistService.find({ 
      where: { screen_id },
      relations: ['content', 'content_website'] 
    })
    
    const playlist = [];

    data.forEach(item => {
      const date = new Date();
      date.setHours(date.getHours() - 3);

      const dateNull = new Date('1970-01-01T00:00:00.000Z');
      const dateStart = new Date(item.content.start_date);
      const dateEnd = new Date(item.content.expiry_date);

      if (dateStart.getTime() === dateNull.getTime() || dateEnd.getTime() === dateNull.getTime()) {
        playlist.push(item);
      }

      if (dateStart.getTime() <= date.getTime() && date.getTime() <= dateEnd.getTime()) {
        playlist.push(item);
      }
    })

    return playlist
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

  findOneContentAllPlaylist(content_id: string) {
    return this.playlistService.find({ 
      where: { content_id },
    })
  }

  async removeContent(content_id: string) {
    const data = await this.findOneContentAllPlaylist(content_id)

    if (!data || data.length === 0) {
      throw new Error('Content not found in any playlist');
    }
    
    return this.playlistService.remove(data)
  }
}
