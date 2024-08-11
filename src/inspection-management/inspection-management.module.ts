import { Module } from '@nestjs/common';
import { RegisterInspectionCommandHandler } from './register-inspection.command-handler.service';
import { InspectionManagementController } from './inspection-management.controller';

@Module({
  providers: [RegisterInspectionCommandHandler],
  controllers: [InspectionManagementController]
})
export class InspectionManagementModule {}
