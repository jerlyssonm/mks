import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll() {
    return await this.usersRepository.find({
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('not Found!');
    }
    return user;
  }

  async findByEmail(email: string): Promise<UsersEntity | undefined> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('not found!');
    }
    return user;
  }

  async create(data: CreateUserDto) {
    try {
      const user = this.usersRepository.create(data);
      return await this.usersRepository.save(user);
    } catch (e) {
      if (e.code.toString() === '23505') {
        throw new ConflictException('Endereço de email já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário no banco de dados',
        );
      }
    }
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.findOne(id);
    this.usersRepository.merge(user, data);
    return await this.usersRepository.save(user);
  }

  async destroy(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('Not Found User');
    }
    this.usersRepository.delete(id);
  }
}
