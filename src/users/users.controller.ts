import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.warn('FIRE create, createUserDto = ', createUserDto);
    const x = this.usersService.create(createUserDto);
    console.warn('created', x);
    return x;
    // return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    console.warn('FIRE findall');
    return this.usersService.findAll();
  }

  @Get(':username')
  findByName(@Param('username') username: string) {
    return this.usersService.findUserByName(username);
  }

  @Get('id/:id')
  findById(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  /** Моковский метод */
  // @Get(':id')
  // findUser(@Param('id') username: string) {
  //   return this.usersService.findUser(username);
  // }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.warn('FIRE update, updateUserDto = ', updateUserDto);
    return this.usersService.update(Number(id), updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
