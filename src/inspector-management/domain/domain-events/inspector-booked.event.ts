import { DomainEvent } from "src/core-tools/domain-event";
import { Inspector } from "../inspector.aggregate";
import { AggregateRoot } from "src/core-tools/aggregate-root";

export class InspectorBookedEvent extends DomainEvent {
    readonly occuredAt: Date;
    readonly name = "inspector-booked";

    constructor(readonly aggregate: Inspector) {
        super({
            aggregateId: aggregate.id.value,
        });
        this.occuredAt = new Date();
    }

    getAggregateId(): string {
        return this.aggregate.id.value;
    }

}