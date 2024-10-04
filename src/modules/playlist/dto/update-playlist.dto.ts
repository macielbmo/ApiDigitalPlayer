import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistDto } from './create-playlist.dto';

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
    content_id?: string;
    screen_id?: string;
    duration?: number;
    order?: number;
}
