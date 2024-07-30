import { Test, TestingModule } from '@nestjs/testing';
import { InspectorManagementService } from './inspector-management.service';

describe('InspectorManagementService', () => {
  let service: InspectorManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InspectorManagementService],
    }).compile();

    service = module.get<InspectorManagementService>(InspectorManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
