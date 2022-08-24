import { IsDate, IsString, IsUrl, Length } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @Length(3, 50)
  title: string;

  @IsUrl()
  poster: string;

  @IsString()
  synopsis: string;

  @IsString()
  distributor: string;

  @IsDate()
  debut: Date;
}
