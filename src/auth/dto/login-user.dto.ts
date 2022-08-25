import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @Length(6, 20)
  @ApiProperty()
  @IsString()
  password: string;
}
