import { Test, TestingModule } from '@nestjs/testing';
import { InspectionManagementService } from './inspection-management.service';

describe('InspectionManagementService', () => {
  let service: InspectionManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InspectionManagementService],
    }).compile();

    service = module.get<InspectionManagementService>(InspectionManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
