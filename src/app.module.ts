import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InspectorManagementService } from './inspector-management/inspector-management.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, InspectorManagementService],
})
export class AppModule {}
