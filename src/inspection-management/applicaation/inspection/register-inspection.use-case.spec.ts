import { Inspection } from "../../domain/inspection/inspection.aggregate";
import { ClientsRepositoryPort } from "../../domain/ports/client-repository.port";
import { InspectionRepositoryPort } from "../../domain/ports/inspection-repository.port";
import { SubscriptionLevel } from "../../domain/subscription-level";
import { RegisterInspectionCommand } from "./register-inspection.command";
import { registerInspectionUseCase } from "./register-inspection.handler.use-case";

describe('registerInspectionUsecase', () => {
  let command: RegisterInspectionCommand;
  let clientsRepository: ClientsRepositoryPort;
  let inspectionsRepository: InspectionRepositoryPort;
  let saveInspectionSpy = jest.fn();
  let findClientByIdSpy = jest.fn();
  let createInspectionSideEffectSpy: jest.SpyInstance;

  beforeEach(() => {
    command = {
      clientId: 'clientId',
      siteId: 'siteId',
    };
    clientsRepository = {
      findById: findClientByIdSpy,
      save: jest.fn(),
    };
    inspectionsRepository = {
      save: saveInspectionSpy,
      findById: jest.fn(),
    };
    createInspectionSideEffectSpy = jest.spyOn(Inspection, 'create');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call findById method of clients repository', async () => {
    findClientByIdSpy.mockResolvedValue({
      getSubscriptionLevel: jest.fn().mockReturnValue(SubscriptionLevel.Essential),
    });

    await registerInspectionUseCase(command, { clientsRepository, inspectionsRepository });
    expect(clientsRepository.findById).toHaveBeenCalled();
  });

  it('should create and save a new inspection', async () => {
    const clientSubscriptionLevel = SubscriptionLevel.Essential;
    const client = {
      getSubscriptionLevel: jest.fn().mockReturnValue(clientSubscriptionLevel),
    };


    const inspection = {
      name: 'like i am an inspection object',
    };

    createInspectionSideEffectSpy.mockReturnValue(inspection);

    findClientByIdSpy.mockResolvedValue(client);
    saveInspectionSpy.mockResolvedValue(inspection);

    await registerInspectionUseCase(command, { clientsRepository, inspectionsRepository });
    expect(inspectionsRepository.save).toHaveBeenCalledWith(inspection);
  });
});