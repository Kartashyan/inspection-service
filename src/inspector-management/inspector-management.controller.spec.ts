import { Test, TestingModule } from '@nestjs/testing';
import { InspectorManagementController } from './inspector-management.controller';

describe('InspectorManagementController', () => {
  let controller: InspectorManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InspectorManagementController],
    }).compile();

    controller = module.get<InspectorManagementController>(InspectorManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
