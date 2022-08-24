import { Length, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(3, 50)
  name: string;
}
