import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgreementsService } from './agreements.service';
import { CreateAgreementDto } from './dto/create-agreement.dto';
import { UpdateAgreementDto } from './dto/update-agreement.dto';

@Controller('agreements')
export class AgreementsController {
  constructor(private readonly agreementsService: AgreementsService) {}

  @Post()
  create(@Body() createAgreementDto: CreateAgreementDto) {
    return this.agreementsService.create(createAgreementDto);
  }

  @Get('/:name')
  getByName(@Param('name') name: string) {
    return this.agreementsService.getAgreementByName(name);
  }

  @Get('id/:id')
  getById(@Param('id') id: number) {
    return this.agreementsService.findOne(id);
  }

  @Get()
  findAll() {
    return this.agreementsService.findAll();
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateRoleDto: UpdateAgreementDto) {
    return this.agreementsService.update(name, updateRoleDto);
  }

  @Delete('hard/:id')
  remove(@Param('id') id: string) {
    return this.agreementsService.hardRemove(+id);
  }
}
