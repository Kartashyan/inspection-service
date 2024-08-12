import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { RegisterInspectionCommand } from '../applicaation/inspection/register-inspection.command';
import { registerInspectionUseCase } from '../applicaation/inspection/register-inspection.handler.use-case';
import { ClientsRepositoryPort } from '../domain/ports/client-repository.port';
import { InspectionRepositoryPort } from '../domain/ports/inspection-repository.port';
import { CLIENT_REPOSITORY, INSPECTION_REPOSITORY } from './inspection-management.di-tokens';

export type CreateNewInspectionDto = {
    clientId: string;
    siteId: string;
};

@CommandHandler(RegisterInspectionCommand)
export class RegisterInspectionCommandHandler {
    constructor(
        @Inject(INSPECTION_REPOSITORY) private readonly inspectionRepository: InspectionRepositoryPort,
        @Inject(CLIENT_REPOSITORY) private readonly clientRepository: ClientsRepositoryPort
    ) { }
    async execute(command: RegisterInspectionCommand) {
        await registerInspectionUseCase(command, {
            clientsRepository: this.clientRepository,
            inspectionsRepository: this.inspectionRepository
        });
    }
}
