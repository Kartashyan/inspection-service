import { RegisterInspectionCommandHandler, CreateNewInspectionDto } from './register-inspection.command-handler.service';
import * as registerInspectionUsecase from './applicaation/register-inspection.use-case';
import { ClientsRepositoryPort } from './domain/ports/client-repository.port';
import { InspectionRepositoryPort } from './domain/ports/inspection-repository.port';
import { SubscriptionLevel } from './domain/subscription-level';

describe('RegisterInspectionCommandHandler', () => {
  let handler: RegisterInspectionCommandHandler;
  let inspectionRepository: InspectionRepositoryPort;
  let clientRepository: ClientsRepositoryPort;
  let registerInspectionUsecaseSpy: jest.SpyInstance;
  let findClientByIdSpy = jest.fn();

  beforeEach(() => {
    inspectionRepository = {
      save: jest.fn(),
      findById: jest.fn(),
    };
    clientRepository = {
      findById: findClientByIdSpy,
      save: jest.fn(),
    };
    handler = new RegisterInspectionCommandHandler(inspectionRepository, clientRepository);
    registerInspectionUsecaseSpy = jest.spyOn(registerInspectionUsecase, 'registerInspectionUsecase');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call registerInspectionUsecase with the correct parameters', async () => {
    const dto: CreateNewInspectionDto = {
      clientId: 'clientId',
      siteId: 'siteId',
    };

    findClientByIdSpy.mockResolvedValue({
      getSubscriptionLevel: jest.fn().mockReturnValue(SubscriptionLevel.Essential),
    });

    await handler.execute(dto);

    expect(registerInspectionUsecaseSpy).toHaveBeenCalledWith(dto, {
      clientsRepository: clientRepository,
      inspectionsRepository: inspectionRepository,
    });
  });
});