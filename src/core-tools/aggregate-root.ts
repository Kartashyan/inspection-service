import { DomainEvent } from "./domain-event";
import { Entity } from "./entity";
import { UID } from "./id";
import { EventEmitter2 } from '@nestjs/event-emitter';

interface EventEmitter<A> {
    emitAsync(name: string, event: DomainEvent): Promise<any[]>;
}

export class AggregateRoot<T extends { id: UID }> extends Entity<T> {
    protected _domainEvents: DomainEvent[];
    constructor(_props: T) {
        super(_props);
        this._domainEvents = [];
    }

    public addDomainEvent(event: DomainEvent): void {
        this._domainEvents.push(event);
    }

    getDomainEvents(): DomainEvent[] {
        return this._domainEvents;
    }

    public async publishEvents(
        eventEmitter: EventEmitter<AggregateRoot<T>>,
    ): Promise<void> {
        await Promise.all(
            this.getDomainEvents().map(async (event) => {
                return eventEmitter.emitAsync(event.name, event);
            }),
        );
        this.clearEvents();
    }

    public clearEvents(): void {
        this._domainEvents = [];
    }
}