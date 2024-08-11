import { Module, Provider } from '@nestjs/common';
import { RegisterInspectionCommandHandler } from './register-inspection.command-handler.service';
import { InspectionManagementController } from './inspection-management.controller';
import { InspectionInMemoryTestRepositoryAdapter } from './inspection-repository.adapter';
import { CLIENT_REPOSITORY, INSPECTION_REPOSITORY } from './inspection-management.di-tokens';
import { ClientInMemoryTestRepositoryAdapter } from './client-repository.adapter';

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
@Module({
  providers: [
    ...repositories,
    RegisterInspectionCommandHandler
  ],
  controllers: [InspectionManagementController]
})
export class InspectionManagementModule {}
