import { AggregateRoot } from "src/core-tools/aggregate-root";
import { UID } from "src/core-tools/id";
import { SubscriptionLevel } from "./subscription-level";

export interface InspectionProps {
    id: UID;
    inspectorId: string;
    inspectionDate: Date;
    subscriptionLevel: SubscriptionLevel;
}

export class Inspection extends AggregateRoot<InspectionProps> {
    constructor(props: InspectionProps) {
        super(props);
    }
}