import { UID } from "src/core-tools/id";
import { InspectionDate } from "../domain/inspection-date.value-object";
import { InspectionRepositoryPort } from "../domain/ports/inspection-repository.port";

export class InspectorBookedEventHandler {
    constructor(
        private inspectionRepository: InspectionRepositoryPort,
    ) {
        this.inspectionRepository = inspectionRepository;
    }
    async handle(event: {
        aggregateId: UID;
        inspectorId: UID;
        inspectionDate: InspectionDate;
    }) {
        const inspection = await this.inspectionRepository.findById(event.aggregateId);

        inspection.scheduleInspection(event.inspectorId, event.inspectionDate);

        await this.inspectionRepository.save(inspection);
    }
}