import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './movie.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private movieRepository: Repository<MovieEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async clearCache() {
    const keys: string[] = await this.cacheManager.store.keys();
    keys.forEach((key) => {
      if (key.startsWith('MOVIE_CACHE_KEY')) {
        this.cacheManager.del(key);
      }
    });
  }

  async create(createMovieDto: CreateMovieDto) {
    await this.clearCache();
    return this.movieRepository.save(createMovieDto);
  }

  async findAll() {
    return this.movieRepository.find();
  }

  async findOne(id: number) {
    return this.movieRepository.findOneBy({ id });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    await this.clearCache();
    this.movieRepository.update(id, updateMovieDto);
    return { message: { fields_atualized: updateMovieDto } };
  }

  async remove(id: number) {
    await this.movieRepository.delete(id);
    await this.clearCache();
  }
}
