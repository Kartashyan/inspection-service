import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InspectionManagementModule } from './inspection-management/infra/inspection-management.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, InspectionManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
