import { DomainEvent, DomainEventProps } from "src/core-tools/domain-event";

export class InspectionCreatedEvent extends DomainEvent {
    constructor(readonly props: DomainEventProps) {
        super(props);
    }

    getInspectionId() {
        return this.props.aggregateId;
    }

}