import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class UpdateMovieDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(3, 50)
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  poster: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  synopsis: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  distributor: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  debut: Date;
}
