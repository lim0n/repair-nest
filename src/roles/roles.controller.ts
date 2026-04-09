import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @Get('/:name')
  getByValue(@Param('name') name: string) {
    return this.rolesService.getRoleByName(name);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Delete('hard/:id')
  remove(@Param('id') id: string) {
    return this.rolesService.hardRemove(+id);
  }
}
