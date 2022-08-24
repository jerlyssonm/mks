import { Transform } from 'class-transformer';
import { IsDate, IsString, IsUrl, Length } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @Length(3, 50)
  title: string;

  @IsUrl()
  poster: string;

  @IsString()
  synopsis: string;

  @IsString()
  distributor: string;

  @IsString()
  country: string;

  @IsString()
  director: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  debut: Date;
}
