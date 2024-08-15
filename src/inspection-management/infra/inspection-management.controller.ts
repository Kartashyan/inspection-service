import { Body, Controller, NotFoundException, Post, ValidationPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ClientNotFoundError } from '../applicaation/client-not-found.error';
import { RegisterInspectionCommand } from '../applicaation/inspection/register-inspection.command';
import { RegisterInspectionRequestDto } from './register-inspection-request.dto';

@Controller('inspection-management')
export class InspectionManagementController {
    constructor(private readonly commandBus: CommandBus) { }
    @Post('register-new')
    async createInspection(@Body(ValidationPipe) body: RegisterInspectionRequestDto): Promise<string> {
        const command = new RegisterInspectionCommand(body.clientId, body.siteId);
        try {
            await this.commandBus.execute(command);
            return `New inspection registered for client ${command.clientId} and site ${command.siteId}`;
        } catch (error) {
            if (error instanceof ClientNotFoundError) {
                throw new NotFoundException(error.message);
            } else {
                throw error;
            }

        }
    }
}
