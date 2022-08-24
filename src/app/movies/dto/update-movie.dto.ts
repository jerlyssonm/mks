import { IsDate, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  @Length(3, 50)
  title: string;

  @IsOptional()
  @IsUrl()
  poster: string;

  @IsOptional()
  @IsString()
  synopsis: string;

  @IsOptional()
  @IsString()
  distributor: string;

  @IsOptional()
  @IsDate()
  debut: Date;
}
