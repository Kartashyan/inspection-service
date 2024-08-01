import { AggregateRoot } from "src/core-tools/aggregate-root";
import { UID } from "src/core-tools/id";
import { SubscriptionLevel } from "./subscription-level";
import { InspectionDate } from "./inspection-date.value-object";
import { InspectionCreatedEvent } from "./domain-events/inspection-created.event";

export type InspectionProps<Scheduled extends boolean> = {
    id: UID;
    inspectorId: Scheduled extends true ? UID : null;
    requestedDate: InspectionDate;
    inspectionDate: Scheduled extends true ? InspectionDate : null;
    subscriptionLevel: SubscriptionLevel;
    isScheduled: Scheduled extends true ? true : false;
}

export class Inspection extends AggregateRoot<InspectionProps<boolean>> {
    private constructor(props: InspectionProps<boolean>) {
        super(props);
    }

    static create(props: InspectionProps<boolean>): Inspection {
        const inspection = new Inspection(props);
        if(props.id.isNew) {
            inspection.addDomainEvent(new InspectionCreatedEvent(inspection));
        }
        return inspection;
    }
}