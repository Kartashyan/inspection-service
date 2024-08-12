import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { RegisterInspectionRequestDto } from './register-inspection-request.dto';
import { RegisterInspectionCommand } from '../applicaation/inspection/register-inspection.command';
import { CommandBus } from '@nestjs/cqrs';

@Controller('inspection-management')
export class InspectionManagementController {
    constructor(private readonly commandBus: CommandBus) {}
    @Post('register-new')
    async createInspection(@Body(ValidationPipe) body: RegisterInspectionRequestDto): Promise<string> {
        const command = new RegisterInspectionCommand(body.clientId, body.siteId);
        await this.commandBus.execute(command);
        return `New inspection registered for client ${command.clientId} and site ${command.siteId}`;
    }
}
