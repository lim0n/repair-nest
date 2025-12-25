import { Test, TestingModule } from '@nestjs/testing';
import { RepairRequestController } from './repair-request.controller';
import { RepairRequestService } from './repair-request.service';

describe('RepairRequestController', () => {
  let controller: RepairRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepairRequestController],
      providers: [RepairRequestService],
    }).compile();

    controller = module.get<RepairRequestController>(RepairRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
