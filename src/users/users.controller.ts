import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  Patch
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateAgreementDto } from 'src/agreements/dto/create-agreement.dto';
import { OwnerGuard } from 'src/auth/owner.guard';

@ApiTags('Пользователи')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User})
  @Post()
  @Roles('admin')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User]})
  @Get()
  @Roles('admin')
  findAll( @Query('withDeleted') withDeleted: string ) {
    return this.usersService.findAll(JSON.parse(withDeleted));
  }

  @Get(':id')
  @UseGuards(OwnerGuard)
  findByName(@Param('id') username: string) {
    return this.usersService.findUserByName(username);
  }

  @Get('id/:id')
  @UseGuards(OwnerGuard)
  findById(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('id/:id')
  @UseGuards(OwnerGuard)
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Delete('hard/:id')
  @Roles('admin')
  hardRemove(@Param('id') id: string) {
    return this.usersService.hardRemove(+id);
  }

  @ApiOperation({ summary: 'Добавление соглашения' })
  @ApiResponse({ status: 200, type: User})
  @Post('add-agreement')
  addAgreement(@Body() agreement: CreateAgreementDto, @Request() req) {
    return this.usersService.addAgreement(agreement, req);
  }

  @ApiOperation({ summary: 'Отзыв соглашения соглашения' })
  @ApiResponse({ status: 200, type: User})
  @Post('remove-agreement')
  removeAgreement(@Body() agreement: CreateAgreementDto, @Request() req) {
    return this.usersService.removeAgreement(agreement, req);
  }
}
