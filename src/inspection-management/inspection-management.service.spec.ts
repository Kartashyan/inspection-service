import { Test, TestingModule } from '@nestjs/testing';
import { CreateNewInspectionDto, InspectionManagementService } from './inspection-management.service';
import { InspectionRepositoryPort } from './domain/ports/inspection-repository.port';
import { InspectionInMemoryTestRepositoryAdapter } from './infra/inspection-repository.adapter';
import { CLIENT_REPOSITORY, INSPECTION_REPOSITORY } from './inspection-management.di-tokens';
import { find } from 'rxjs';
import { ClientsRepositoryPort } from './domain/ports/client-repository.port';
import { SubscriptionLevel } from './domain/subscription-level';

describe('InspectionManagementService', () => {
  let service: InspectionManagementService;
  let inspectionRepository: InspectionRepositoryPort;
  let clientRepository: ClientsRepositoryPort;
  let findClientByIdSpy = jest.fn();
  let saveInspectionSpy = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InspectionManagementService,
        {
          provide: INSPECTION_REPOSITORY,
          useValue: {
            save: saveInspectionSpy,
            findById: jest.fn(),
          }
        },
        {
          provide: CLIENT_REPOSITORY,
          useValue: {
            save: jest.fn(),
            findById: findClientByIdSpy,
          }
        },
      ],
    }).compile();

    service = module.get<InspectionManagementService>(InspectionManagementService);
    inspectionRepository = module.get<InspectionRepositoryPort>(INSPECTION_REPOSITORY);
    clientRepository = module.get<ClientsRepositoryPort>(CLIENT_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerNewInspection', () => {
    it('should be defined', () => {
      expect(service.registerNewInspection).toBeDefined();
    });
    it('should call findById method of client repository', async () => {
      const dto: CreateNewInspectionDto = {
        clientId: 'clientId',
        siteId: 'siteId',
      };
      findClientByIdSpy.mockResolvedValue({
        getSubscriptionLevel: jest.fn().mockReturnValue(SubscriptionLevel.Essential),
      });
      await service.registerNewInspection(dto);
      expect(clientRepository.findById).toHaveBeenCalled();
    });
    it('should call save method of inspection repository', async () => {
      const dto = {
        clientId: 'clientId',
        siteId: 'siteId',
      } as CreateNewInspectionDto;
      await service.registerNewInspection(dto);
      expect(inspectionRepository.save).toHaveBeenCalled();
    });
  });
});
