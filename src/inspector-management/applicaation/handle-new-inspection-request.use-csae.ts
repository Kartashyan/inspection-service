import { UID } from "src/core-tools/id";
import { InspectionDate } from "../domain/inspection-date.value-object";
import { Inspection, InspectionProps } from "../domain/inspection.aggregate";
import { ClientsRepositoryPort } from "../domain/ports/client-repository.port";
import { InspectionsRepositoryPort } from "../domain/ports/inspection-repository.port";
import { InspectionRequestDto } from "./inspection.dto";

export class HandleNewInspectionRequestUseCase {
    constructor(
        private inspectionsRepository: InspectionsRepositoryPort,
        private clientsRepository: ClientsRepositoryPort
    ) {}

    async handle(request: InspectionRequestDto): Promise<void> {
        const client = await this.clientsRepository.findById(request.clientId);
        const inspectionProps: InspectionProps<false> = {
            id: new UID(),
            inspectorId: null,
            requestedDate: new InspectionDate(new Date()),
            inspectionDate: null,
            subscriptionLevel: client.getSubscriptionLevel(),
            isScheduled: false
        };
        const inspection = Inspection.create(inspectionProps);
        await this.inspectionsRepository.save(inspection);
    }
}