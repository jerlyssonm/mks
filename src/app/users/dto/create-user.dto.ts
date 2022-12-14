import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @Length(6, 20)
  @ApiProperty()
  @IsString()
  password: string;
}
