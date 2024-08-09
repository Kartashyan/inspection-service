import { Module } from '@nestjs/common';
import { InspectionManagementService } from './inspection-management.service';
import { InspectionManagementController } from './inspection-management.controller';

@Module({
  providers: [InspectionManagementService],
  controllers: [InspectionManagementController]
})
export class InspectionManagementModule {}
