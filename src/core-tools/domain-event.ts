import { UID } from "./id";

type EventProps = {
    aggregateId: UID;
}

export abstract class DomainEvent {
    readonly occuredAt: Date;
    readonly name: string;
    readonly aggregateId: UID;

    constructor(readonly props: EventProps) {
        this.occuredAt = new Date();
        this.aggregateId = props.aggregateId;
    }
}