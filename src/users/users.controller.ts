import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    console.warn('FIRE findall');
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') username: string) {
    return this.usersService.findOne(username);
  }

  /** Моковский метод */
  @Get(':id')
  findUser(@Param('id') username: string) {
    return this.usersService.findUser(username);
  }

  @Put(':id')
  update(
    @Param('id') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(username, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') username: string) {
    return this.usersService.remove(username);
  }
}
