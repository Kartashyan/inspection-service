import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { RegisterInspectionCommand } from './register-inspection.command';
import { ClientsRepositoryPort } from '../../domain/ports/client-repository.port';
import { InspectionRepositoryPort } from '../../domain/ports/inspection-repository.port';
import { CLIENT_REPOSITORY, INSPECTION_REPOSITORY } from '../../infra/inspection-management.di-tokens';
import { UID } from 'src/core-tools/id';
import { Inspection, InspectionProps } from 'src/inspection-management/domain/inspection/inspection.aggregate';
import { InspectionDate } from 'src/inspection-management/domain/inspection-date.value-object';

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
        const client = await this.clientRepository.findById(command.clientId);
        const inspectionProps: InspectionProps<false> = {
            id: new UID(),
            inspectorId: null,
            requestedDate: new InspectionDate(new Date()),
            inspectionDate: null,
            subscriptionLevel: client.getSubscriptionLevel(),
            isScheduled: false
        };
        const inspection = Inspection.create(inspectionProps);
        await this.inspectionRepository.save(inspection);
    }
}
