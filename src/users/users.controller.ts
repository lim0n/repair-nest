import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query
} from '@nestjs/common';
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
  findAll( @Query('withDeleted') withDeleted: string ) {
    return this.usersService.findAll(JSON.parse(withDeleted));
  }

  @Get(':username')
  findByName(@Param('username') username: string) {
    return this.usersService.findUserByName(username);
  }

  @Get('id/:id')
  findById(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Delete('hard/:id')
  hardRemove(@Param('id') id: string) {
    return this.usersService.hardRemove(+id);
  }
}
