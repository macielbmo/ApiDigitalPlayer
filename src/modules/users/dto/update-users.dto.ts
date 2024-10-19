import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './users.dto';

export class UpdateScreenDto extends PartialType(CreateUserDto) {}
