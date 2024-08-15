import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { UID } from 'src/core-tools/id';
import { InspectionSchedulingDomainService } from 'src/inspection-management/domain/domain-services/inspection-scheduling.domain-service';
import { InspectorRepositoryPort } from 'src/inspection-management/domain/ports/inspector-repository.port';
import { InspectionRepositoryPort } from '../../domain/ports/inspection-repository.port';
import { INSPECTION_REPOSITORY, INSPECTOR_REPOSITORY } from '../../infra/inspection-management.di-tokens';
import { BookInspectorForInspectionCommand } from './book-inspector-for-inspection.command';

export type CreateNewInspectionDto = {
    clientId: string;
    siteId: string;
};

@CommandHandler(BookInspectorForInspectionCommand)
export class BookInspectorCommandHandler {
    constructor(
        @Inject(INSPECTOR_REPOSITORY) private readonly inspectorRepository: InspectorRepositoryPort,
        @Inject(INSPECTION_REPOSITORY) private readonly inspectionRepository: InspectionRepositoryPort,
    ) { }
    async execute(command: BookInspectorForInspectionCommand) {
        const inspectorService = new InspectionSchedulingDomainService(this.inspectorRepository);
        const inspection = await this.inspectionRepository.findById(new UID(command.inspectionId));
        await inspectorService.schedule(inspection);
    }
}
