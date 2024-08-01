import { DomainEvent } from "src/core-tools/domain-event";
import { Inspection } from "../inspection.aggregate";

export class InspectionCreatedEvent implements DomainEvent<Inspection> {
    readonly occuredAt: Date;
    readonly name = "inspection-created";

    constructor(public readonly aggregate: Inspection) {
        this.occuredAt = new Date();
    }

    getAggregateId(): string {
        return this.aggregate.id.value;
    }

}