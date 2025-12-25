import { Module } from '@nestjs/common';
import { RepairRequestService } from './repair-request.service';
import { RepairRequestController } from './repair-request.controller';

@Module({
  controllers: [RepairRequestController],
  providers: [RepairRequestService],
})
export class RepairRequestModule {}
