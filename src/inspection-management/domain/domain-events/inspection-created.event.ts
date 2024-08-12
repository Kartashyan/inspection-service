import { DomainEvent } from "src/core-tools/domain-event";
import { Inspection } from "../inspection/inspection.aggregate";

export class InspectionCreatedEvent extends DomainEvent {
    readonly occuredAt: Date;
    readonly name = "inspection-created";

    constructor(readonly aggregate: Inspection) {
        super({
            aggregateId: aggregate.id,
        });
        this.occuredAt = new Date();
    }

    getAggregateId(): string {
        return this.aggregate.id.value;
    }

}