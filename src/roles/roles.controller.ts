import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('roles')
@UseGuards(AuthGuard, RolesGuard)
@Roles('admin')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @Get('/:name')
  getByName(@Param('name') name: string) {
    return this.rolesService.getRoleByName(name);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(name, updateRoleDto);
  }

  @Delete('hard/:id')
  remove(@Param('id') id: string) {
    return this.rolesService.hardRemove(+id);
  }
}
