import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  CacheInterceptor,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './movie.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Filmes')
@Controller('movies')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard('jwt'))
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseInterceptors(CacheInterceptor)
  @ApiBearerAuth()
  @HttpCode(201)
  @ApiOperation({ summary: 'Cria um novo filme!' })
  async create(@Body() createMovieDto: CreateMovieDto): Promise<MovieEntity> {
    const movie = await this.moviesService.create(createMovieDto);
    return movie;
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Busca todos os filmes' })
  async findAll(): Promise<MovieEntity[]> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um filme por ID' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<MovieEntity> {
    return this.moviesService.findOne(id);
  }

  @Put(':id')
  @HttpCode(201)
  @ApiOperation({ summary: 'Atualiza os dados de um filme por ID' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return await this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Apaga um filme por ID' })
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.moviesService.remove(id);
  }
}
