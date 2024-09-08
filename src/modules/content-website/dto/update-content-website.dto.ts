import { PartialType } from '@nestjs/mapped-types';
import { CreateContentWebsiteDto } from './create-content-website.dto';

export class UpdateContentWebsiteDto extends PartialType(CreateContentWebsiteDto) {}
