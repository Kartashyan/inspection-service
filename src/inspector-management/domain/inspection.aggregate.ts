import { AggregateRoot } from "src/core-tools/aggregate-root";
import { UID } from "src/core-tools/id";
import { SubscriptionLevel } from "./subscription-level";
import { InspectionDate } from "./inspection-date.value-object";
import { InspectionCreatedEvent } from "./domain-events/inspection-created.event";

export interface InspectionProps {
    id: UID;
    inspectorId: UID;
    inspectionDate: InspectionDate;
    subscriptionLevel: SubscriptionLevel;
}

export class Inspection extends AggregateRoot<InspectionProps> {
    constructor(props: InspectionProps) {
        super(props);
    }

    static create(props: InspectionProps): Inspection {
        const inspection = new Inspection(props);
        if(props.id.isNew) {
            inspection.addDomainEvent(new InspectionCreatedEvent(inspection));
        }
        return inspection;
    }
}