import { Test, TestingModule } from '@nestjs/testing';
import { InspectionManagementController } from './inspection-management.controller';

describe('InspectionManagementController', () => {
  let controller: InspectionManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InspectionManagementController],
    }).compile();

    controller = module.get<InspectionManagementController>(InspectionManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
