import { DomainEvent } from "src/core-tools/domain-event";
import { Inspector } from "../inspector.aggregate";
import { AggregateRoot } from "src/core-tools/aggregate-root";
import { inspect } from "util";
import { InspectionDate } from "../inspection-date.value-object";
import { UID } from "src/core-tools/id";
import { SubscriptionLevel } from "../subscription-level";

type InspectionDto = {
    date: InspectionDate;
    inspectionId: UID;
    inspectionLevel: SubscriptionLevel;
}

export class InspectorBookedEvent extends DomainEvent {
    readonly occuredAt: Date;
    readonly name = "inspector-booked";
    readonly inspectorId: UID;
    readonly inspectionDate: InspectionDate;

    constructor(readonly aggregateId: UID, inspectionDto: InspectionDto) {
        super({
            aggregateId: aggregateId,
        });
        this.occuredAt = new Date();
        this.inspectorId = aggregateId;
        this.inspectionDate = inspectionDto.date
    }

    getAggregateId(): UID {
        return this.inspectorId;
    }

}