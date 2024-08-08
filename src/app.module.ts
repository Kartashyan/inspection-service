import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InspectorManagementModule } from './inspector-management/inspector-management.module';

@Module({
  imports: [InspectorManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
