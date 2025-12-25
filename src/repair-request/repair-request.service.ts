import { Injectable } from '@nestjs/common';
import { CreateRepairRequestDto } from './dto/create-repair-request.dto';
import { UpdateRepairRequestDto } from './dto/update-repair-request.dto';

@Injectable()
export class RepairRequestService {
  create(createRepairRequestDto: CreateRepairRequestDto) {
    return 'This action adds a new repairRequest';
  }

  findAll() {
    return `This action returns all repairRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} repairRequest`;
  }

  update(id: number, updateRepairRequestDto: UpdateRepairRequestDto) {
    return `This action updates a #${id} repairRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} repairRequest`;
  }
}
