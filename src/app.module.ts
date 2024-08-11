import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InspectionManagementModule } from './inspection-management/infra/inspection-management.module';

@Module({
  imports: [InspectionManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
