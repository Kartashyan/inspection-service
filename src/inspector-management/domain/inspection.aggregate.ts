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

    getSubscriptionLevel(): SubscriptionLevel {
        return this.props.subscriptionLevel;
    }

    getRequestedDate(): InspectionDate {
        return this.props.requestedDate;
    }

    scheduleInspection(inspectorId: UID, inspectionDate: InspectionDate) {
        if(this.props.isScheduled) {
            throw new Error("Inspection is already scheduled");
        }
        this.props.inspectorId = inspectorId;
        this.props.inspectionDate = inspectionDate;
        this.props.isScheduled = true;
    }

    static create(props: InspectionProps<boolean>): Inspection {
        const inspection = new Inspection(props);
        if(props.id.isNew) {
            inspection.addDomainEvent(new InspectionCreatedEvent(inspection));
        }
        return inspection;
    }
}