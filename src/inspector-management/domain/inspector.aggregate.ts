import { AggregateRoot } from "src/core-tools/aggregate-root";
import { UID } from "src/core-tools/id";
import { SubscriptionLevel } from "./subscription-level";

type InspectorProps = {
    id: UID;
    schedule: {
        date: Date;
        inspectionId: UID;
        inspectionLevel: SubscriptionLevel;
    }[];
    subscriptionLevelsAllowed: SubscriptionLevel[];
};

export class Inspector extends AggregateRoot<InspectorProps> {
    constructor(props: InspectorProps) {
        super(props);
    }

    assignInspection(date: Date, inspectionId: UID, inspectionLevel: SubscriptionLevel): void {
        this.props.schedule.push({ date, inspectionId, inspectionLevel });
    }
}