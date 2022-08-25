import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsString, IsUrl, Length } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  @Length(3, 50)
  title: string;

  @ApiProperty()
  @IsUrl()
  poster: string;

  @ApiProperty()
  @IsString()
  synopsis: string;

  @ApiProperty()
  @IsString()
  distributor: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  director: string;

  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  debut: Date;
}
