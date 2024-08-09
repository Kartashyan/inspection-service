import { Test, TestingModule } from '@nestjs/testing';
import { CreateNewInspectionDto, InspectionManagementService } from './inspection-management.service';

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

  describe('registerNewInspection', () => {
    it('should be defined', () => {
      expect(service.registerNewInspection).toBeDefined();
    });

    it('should throw and error if new inspection dto is invalid', () => {
      const dto = {
        clientId: '',
        siteId: '',
      } as CreateNewInspectionDto;
      expect(() => service.registerNewInspection(dto)).toThrow();
    });
  });
});
