import { UID } from "../../core-tools/id";
import { SubscriptionLevel } from "./subscription-level";
import { InspectionDate } from "./inspection-date.value-object";
import { DomainError } from "../../core-tools/domain-error";
import { AggregateRoot } from "../../core-tools/aggregate-root";

type InspectorProps = {
    id: UID;
    schedule: {
        date: InspectionDate;
        inspectionId: UID;
        inspectionLevel: SubscriptionLevel;
    }[];
    subscriptionLevelsAllowed: SubscriptionLevel[];
};

export class Inspector extends AggregateRoot<InspectorProps> {
    constructor(props: InspectorProps) {
        super(props);
    }

    assignInspection(date: InspectionDate, inspectionId: UID, inspectionLevel: SubscriptionLevel): void {
        if (!this.props.subscriptionLevelsAllowed.includes(inspectionLevel)) {
            throw new DomainError("Inspector is not allowed to perform this inspection level");
        }
        if (this.props.schedule.some((inspection) => inspection.date.equals(date))) {
            throw new DomainError("Inspector is already scheduled for this date");
        }
        this.props.schedule.push({ date, inspectionId, inspectionLevel });
    }

    static create(props: InspectorProps): Inspector {
        return new Inspector(props);
    }
}