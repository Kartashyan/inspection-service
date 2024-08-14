import { RegisterInspectionCommandHandler, CreateNewInspectionDto } from './register-inspection.command-handler.service';
import { ClientsRepositoryPort } from '../../domain/ports/client-repository.port';
import { InspectionRepositoryPort } from '../../domain/ports/inspection-repository.port';
import { Inspection } from '../../domain/inspection/inspection.aggregate';
import { SubscriptionLevel } from '../../domain/subscription-level'

describe('RegisterInspectionCommandHandler', () => {
  let handler: RegisterInspectionCommandHandler;
  let inspectionRepository: InspectionRepositoryPort;
  let clientRepository: ClientsRepositoryPort;
  let createInspection: jest.SpyInstance;
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
    createInspection = jest.spyOn(Inspection, 'create');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an unscheduled inspection with the correct properties', async () => {
    const command: CreateNewInspectionDto = {
      clientId: 'clientId',
      siteId: 'siteId',
    };

    const client = {
      getSubscriptionLevel: jest.fn().mockReturnValue(SubscriptionLevel.Essential),
    };

    const inspection = {
      name: 'like i am an inspection object',
    };

    createInspection.mockReturnValue(inspection);
    findClientByIdSpy.mockResolvedValue(client);

    await handler.execute(command);

    expect(createInspection).toHaveBeenCalledWith({
      id: expect.anything(),
      inspectorId: null,
      requestedDate: expect.anything(),
      inspectionDate: null,
      subscriptionLevel: SubscriptionLevel.Essential,
      isScheduled: false,
    });
  });
});