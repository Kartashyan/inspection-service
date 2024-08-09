import { Module } from '@nestjs/common';
import { InspectionManagementService } from './inspection-management.service';

@Module({
  providers: [InspectionManagementService]
})
export class InspectionManagementModule {}
