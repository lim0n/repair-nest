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
  UsePipes,
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
import { IRole } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { InfoValidationPipe } from 'src/pipes/info-validation.pipe';
import { CreateAgreementDto } from 'src/agreements/dto/create-agreement.dto';

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
  // @UseGuards(AuthGuard, RolesGuard)
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

  @Patch('id/:id')
  update(
    @Param('id') id: number,
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

  @ApiOperation({ summary: 'Добавление соглашения' })
  @ApiResponse({ status: 200, type: User})
  @UseGuards(AuthGuard)
  @Post('add-agreement')
  addAgreement(@Body() agreement: CreateAgreementDto, @Request() req) {
    return this.usersService.addAgreement(agreement, req);
  }

  @ApiOperation({ summary: 'Отзыв соглашения соглашения' })
  @ApiResponse({ status: 200, type: User})
  @UseGuards(AuthGuard)
  @Post('remove-agreement')
  removeAgreement(@Body() agreement: CreateAgreementDto, @Request() req) {
    return this.usersService.removeAgreement(agreement, req);
  }
}
