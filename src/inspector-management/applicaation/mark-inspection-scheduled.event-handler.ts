import { InspectionRepositoryPort } from "../domain/ports/inspection-repository.port";

export class MarkInspectionScheduledEventHandler {
    constructor(
        private inspectionRepository: InspectionRepositoryPort,
    ) {
        this.inspectionRepository = inspectionRepository;
    }
    async handle(event) {
        const inspection = await this.inspectionRepository.findById(event.aggregateId);

        inspection.scheduleInspection(event.inspectorId, event.inspectionDate);

        await this.inspectionRepository.save(inspection);
    }
}