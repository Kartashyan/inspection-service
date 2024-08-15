import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { InspectionCreatedEvent } from 'src/inspection-management/domain/domain-events/inspection-created.event';
import { ScheduleInspectionCommand } from '../inspection/schedule-inspection.command';
import { InspectionScheduler } from './inspection-scheduler.domain-event-handler';
import { UID } from 'src/core-tools/id';

describe('InspectionScheduler', () => {
  let inspectionScheduler: InspectionScheduler;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InspectionScheduler,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    inspectionScheduler = module.get<InspectionScheduler>(InspectionScheduler);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  describe('handle', () => {
    it('should execute ScheduleInspectionCommand with the correct parameters', async () => {
      // Arrange
      const inspectionId = new UID('inspectionId');
      const requestedDate = new Date();
      const subscriptionLevel = 'subscriptionLevel';
      const event = new InspectionCreatedEvent({aggregateId: inspectionId});
      const command = new ScheduleInspectionCommand(inspectionId);

      // Act
      await inspectionScheduler.handle(event);

      // Assert
      expect(commandBus.execute).toHaveBeenCalledWith(command);
    });
  });
});