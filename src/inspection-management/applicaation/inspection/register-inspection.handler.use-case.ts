import { UID } from "src/core-tools/id";
import { InspectionDate } from "../../domain/inspection-date.value-object";
import { Inspection, InspectionProps } from "../../domain/inspection/inspection.aggregate";
import { ClientsRepositoryPort } from "../../domain/ports/client-repository.port";
import { InspectionRepositoryPort } from "../../domain/ports/inspection-repository.port";
import { RegisterInspectionCommand } from "./register-inspection.command";

interface Dependancies {
    clientsRepository: ClientsRepositoryPort;
    inspectionsRepository: InspectionRepositoryPort;
}

export async function registerInspectionUseCase(command: RegisterInspectionCommand, dependancies: Dependancies): Promise<void> {
    const client = await dependancies.clientsRepository.findById(command.clientId);
    const inspectionProps: InspectionProps<false> = {
        id: new UID(),
        inspectorId: null,
        requestedDate: new InspectionDate(new Date()),
        inspectionDate: null,
        subscriptionLevel: client.getSubscriptionLevel(),
        isScheduled: false
    };
    const inspection = Inspection.create(inspectionProps);
    await dependancies.inspectionsRepository.save(inspection);
}