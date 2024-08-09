import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InspectorManagementModule } from './inspector-management/inspector-management.module';
import { InspectionManagementModule } from './inspection-management/inspection-management.module';

@Module({
  imports: [InspectorManagementModule, InspectionManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
