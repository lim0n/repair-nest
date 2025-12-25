import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepairRequestService } from './repair-request.service';
import { CreateRepairRequestDto } from './dto/create-repair-request.dto';
import { UpdateRepairRequestDto } from './dto/update-repair-request.dto';

@Controller('repair-request')
export class RepairRequestController {
  constructor(private readonly repairRequestService: RepairRequestService) {}

  @Post()
  create(@Body() createRepairRequestDto: CreateRepairRequestDto) {
    return this.repairRequestService.create(createRepairRequestDto);
  }

  @Get()
  findAll() {
    return this.repairRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repairRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRepairRequestDto: UpdateRepairRequestDto) {
    return this.repairRequestService.update(+id, updateRepairRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repairRequestService.remove(+id);
  }
}
