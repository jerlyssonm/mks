import { Length, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsEmail()
  email: string;

  @Length(6, 20)
  @IsString()
  password: string;
}
