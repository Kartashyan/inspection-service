import { Module, Provider } from '@nestjs/common';
import { RegisterInspectionCommandHandler } from '../applicaation/inspection/register-inspection.command-handler.service';
import { InspectionManagementController } from './inspection-management.controller';
import { InspectionInMemoryTestRepositoryAdapter } from './inspection-repository.adapter';
import { CLIENT_REPOSITORY, INSPECTION_REPOSITORY } from './inspection-management.di-tokens';
import { ClientInMemoryTestRepositoryAdapter } from './client-repository.adapter';
import { CqrsModule } from '@nestjs/cqrs';
import { InspectionScheduler } from '../applicaation/schedule-inspection-when-new-inspection-created/inspection-scheduler.domain-event-handler';

const repositories: Provider[] = [
  {
    provide: INSPECTION_REPOSITORY,
    useClass: InspectionInMemoryTestRepositoryAdapter
  },
  {
    provide: CLIENT_REPOSITORY,
    useClass: ClientInMemoryTestRepositoryAdapter
  },
];

const commandHandlers: Provider[] = [
  RegisterInspectionCommandHandler
];

const eventHandlers: Provider[] = [
  InspectionScheduler
];

@Module({
  imports: [CqrsModule],
  providers: [
    ...repositories,
    ...commandHandlers,
    ...eventHandlers
  ],
  controllers: [InspectionManagementController]
})
export class InspectionManagementModule { }
