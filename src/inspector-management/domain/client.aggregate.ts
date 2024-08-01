import { AggregateRoot } from "src/core-tools/aggregate-root";
import { SubscriptionLevel } from "./subscription-level";
import { UID } from "src/core-tools/id";

interface ClientProps {
    id: UID;
    name: string;
    email: string;
    subscriptionLevel: SubscriptionLevel;
}

export class Client extends AggregateRoot<ClientProps> {
    constructor(props: ClientProps) {
        super(props);
    }

    static create(props: ClientProps): Client {
        return new Client(props);
    }

    getSubscriptionLevel(): SubscriptionLevel {
        return this.props.subscriptionLevel;
    }
}