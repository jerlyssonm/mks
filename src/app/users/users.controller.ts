import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Usuario')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Lista Todos Usuarios' })
  async getAll() {
    return await this.usersService.findAll();
  }

  @Post('register')
  @ApiOperation({ summary: 'Cadastra um novo usuario' })
  async create(@Body() body: CreateUserDto) {
    return await this.usersService.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: 'Busca um usuario por ID' })
  async getOne(@Param('id', new ParseIntPipe()) id: number) {
    return await this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Atualiza dados de um usuario por ID' })
  @Patch(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return await this.usersService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Apaga um usuario por ID' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseIntPipe()) id: number) {
    await this.usersService.destroy(id);
  }
}
