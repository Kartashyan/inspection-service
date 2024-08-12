import { UID } from "../../../core-tools/id";
import { SubscriptionLevel } from "../subscription-level";
import { InspectionDate } from "../inspection-date.value-object";
import { DomainError } from "../../../core-tools/domain-error";
import { AggregateRoot } from "../../../core-tools/aggregate-root";
import { InspectorBookedEvent } from "../domain-events/inspector-booked.event";

type ScheduleItem = {
    date: InspectionDate;
    inspectionId: UID;
    inspectionLevel: SubscriptionLevel;
}
type InspectorProps = {
    id: UID;
    schedule: ScheduleItem[];
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
        const inspectionDto = { date, inspectionId, inspectionLevel };
        this.props.schedule.push(inspectionDto);
        
        this.addDomainEvent(new InspectorBookedEvent(this.id, inspectionDto));
    }

    getSchedule(): ScheduleItem[] {
        return this.props.schedule;
    }

    static create(props: InspectorProps): Inspector {
        if (!this.isValidProps(props)) {
            throw new DomainError("Inspector properties are violating business rules"); // this error message is not very helpful, we need to be more specific here
        }
        return new Inspector(props);
    }

    private static isValidProps(props: InspectorProps): boolean {
        if (!this.hasNoDuplicateDates(props.schedule)) {
            return false;
        }
        if (props.schedule.some((inspection) => !props.subscriptionLevelsAllowed.includes(inspection.inspectionLevel))) {
            return false;
        }
        return true;
    }

    private static hasNoDuplicateDates(items: ScheduleItem[]): boolean {
        const uniqueDates = new Set(items.map(item => item.date));
        return uniqueDates.size === items.length;
    }
}