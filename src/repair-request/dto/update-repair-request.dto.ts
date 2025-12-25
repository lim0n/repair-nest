import { PartialType } from '@nestjs/mapped-types';
import { CreateRepairRequestDto } from './create-repair-request.dto';

export class UpdateRepairRequestDto extends PartialType(CreateRepairRequestDto) {}
