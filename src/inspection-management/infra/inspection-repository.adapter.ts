import { UID } from "src/core-tools/id";
import { Inspection } from "../domain/inspection/inspection.aggregate";
import { InspectionRepositoryPort } from "../domain/ports/inspection-repository.port";
import { EventEmitter2 } from "@nestjs/event-emitter";

export class InspectionInMemoryTestRepositoryAdapter implements InspectionRepositoryPort {
    private inspections: Map<string, Inspection> = new Map();

    async save(inspection: Inspection): Promise<void> {
        if(!this.inspections.has(inspection.id.value)) {
            this.inspections.set(inspection.id.value, inspection);
        }
        inspection.publishEvents(new EventEmitter2());
    }

    async findById(inspectionId: UID): Promise<Inspection> {
        return this.inspections.get(inspectionId.value);
    }
}