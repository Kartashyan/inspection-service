import { UID } from "src/core-tools/id";
import { Inspection } from "../domain/inspection.aggregate";
import { InspectionsRepositoryPort } from "../domain/ports/inspection-repository.port";
import { EventEmitter2 } from "@nestjs/event-emitter";

export class InspectionInMemoryTestRepositoryAdapter implements InspectionsRepositoryPort {
    private inspections: Inspection[] = [];

    async save(inspection: Inspection): Promise<void> {
        this.inspections.push(inspection);
        inspection.publishEvents(new EventEmitter2());
    }

    async findById(inspectionId: string): Promise<Inspection> {
        return this.inspections.find(inspection => inspection.id.equals(new UID(inspectionId)));
    }
}