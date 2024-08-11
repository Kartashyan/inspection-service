import { Test, TestingModule } from '@nestjs/testing';
import { InspectionManagementController } from './inspection-management.controller';
import { CqrsModule } from '@nestjs/cqrs';

describe('InspectionManagementController', () => {
  let controller: InspectionManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [InspectionManagementController],
    }).compile();

    controller = module.get<InspectionManagementController>(InspectionManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
