import { AggregateRoot } from "src/core-tools/aggregate-root";
import { UID } from "src/core-tools/id";
import { SubscriptionLevel } from "./subscription-level";
import { InspectionDate } from "./inspection-date.value-object";

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
}