import { Module } from '@nestjs/common';
import { InspectorManagementController } from './inspector-management.controller';
import { InspectorManagementService } from './inspector-management.service';

@Module({
  controllers: [InspectorManagementController],
  providers: [InspectorManagementService]
})
export class InspectorManagementModule {}
