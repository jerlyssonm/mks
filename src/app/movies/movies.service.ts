import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async create(createMovieDto: CreateMovieDto) {
    return this.movieRepository.save(createMovieDto);
  }

  async findAll() {
    const allMoviesInCache: MovieEntity[] = await this.cacheManager.get(
      'movieCache',
    );
    if (allMoviesInCache) {
      return allMoviesInCache;
    }
    const allMovies: MovieEntity[] = await this.movieRepository.find();
    await this.cacheManager.set('movieCache', allMovies);
    return allMovies;
  }

  async findOne(id: number) {
    const moviesIsCache: MovieEntity[] = await this.cacheManager.get(
      'movieCache',
    );
    if (moviesIsCache) {
      const movie: MovieEntity[] = moviesIsCache.filter(
        (user) => user.id === id,
      );
      return movie[0];
    }
    await this.cacheManager.reset();
    return this.movieRepository.findOneBy({ id });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    this.movieRepository.update(id, updateMovieDto);
    await this.cacheManager.reset();
    return { message: { fields_atualized: updateMovieDto } };
  }

  async remove(id: number) {
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException('Movie Not found');
    }
    await this.cacheManager.reset();
    await this.movieRepository.delete(id);
  }
}
