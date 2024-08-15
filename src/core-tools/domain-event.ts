import { UID } from "./id";

export type DomainEventProps = {
    aggregateId: UID;
}

export abstract class DomainEvent {
    readonly occuredAt: Date;

    constructor(readonly props: DomainEventProps) {
        this.occuredAt = new Date();
    }
}