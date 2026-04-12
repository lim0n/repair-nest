import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
  UsePipes
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { IRole } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { InfoValidationPipe } from 'src/pipes/info-validation.pipe';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User})
  // @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User]})
  @Roles(IRole.Viewer)
  @UseGuards(AuthGuard, RolesGuard)
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
