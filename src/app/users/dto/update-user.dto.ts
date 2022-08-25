import { ApiProperty } from '@nestjs/swagger';
import { Length, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @Length(3, 50)
  name: string;
}
