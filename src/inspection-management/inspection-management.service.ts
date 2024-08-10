import { Inject, Injectable } from '@nestjs/common';
import { InspectionRepositoryPort } from './domain/ports/inspection-repository.port';
import { ClientsRepositoryPort } from './domain/ports/client-repository.port';
import { CLIENT_REPOSITORY, INSPECTION_REPOSITORY } from './inspection-management.di-tokens';
import { Inspection, InspectionProps } from './domain/inspection.aggregate';
import { UID } from 'src/core-tools/id';
import { InspectionDate } from './domain/inspection-date.value-object';

export type CreateNewInspectionDto = {
    clientId: string;
    siteId: string;
};

@Injectable()
export class InspectionManagementService {
    constructor(
        @Inject(INSPECTION_REPOSITORY) private readonly inspectionRepository: InspectionRepositoryPort,
        @Inject(CLIENT_REPOSITORY) private readonly clientRepository: ClientsRepositoryPort
    ) {}
    async registerNewInspection(dto: {
        clientId: string;
        siteId: string;
    }) {
        const client = await this.clientRepository.findById(dto.clientId);
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
