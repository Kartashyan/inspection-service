type EventProps = {
    aggregateId: string;
}

export abstract class DomainEvent {
    readonly occuredAt: Date;
    readonly name: string;
    readonly aggregateId: string;

    constructor(readonly props: EventProps) {
        this.occuredAt = new Date();
        this.aggregateId = props.aggregateId;
    }
}