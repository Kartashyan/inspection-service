import { ValueObject } from "../../core-tools/value-object";
import { Duration } from "./duration.value-object";

enum SubscriptionType {
    Essential = 'Essential',
    Advanced = 'Advanced',
    Premium = 'Premium'
}

interface SubscriptionLevelProps {
    type: SubscriptionType;
    minDeliveryTime: Duration;
    maxDeliveryTime: Duration;
}

export class SubscriptionLevel extends ValueObject<SubscriptionLevelProps> {

    static Essential = new SubscriptionLevel(SubscriptionType.Essential);
    static Advanced = new SubscriptionLevel(SubscriptionType.Advanced);
    static Premium = new SubscriptionLevel(SubscriptionType.Premium);

    constructor(subscriptionType: SubscriptionType) {
        super({
            type: SubscriptionType[subscriptionType],
            minDeliveryTime: SubscriptionLevel.getMinDeliveryTime(subscriptionType),
            maxDeliveryTime: SubscriptionLevel.getMaxDeliveryTime(subscriptionType),
        });
    }
    static getMinDeliveryTime(subscriptionType: SubscriptionType): Duration {
        switch (subscriptionType) {
            case SubscriptionType.Essential:
                return new Duration(28);
            case SubscriptionType.Advanced:
                return new Duration(21);
            case SubscriptionType.Premium:
                return new Duration(0);
        }
    }

    static getMaxDeliveryTime(subscriptionType: SubscriptionType): Duration {
        switch (subscriptionType) {
            case SubscriptionType.Essential:
                return new Duration(120);
            case SubscriptionType.Advanced:
                return new Duration(60);
            case SubscriptionType.Premium:
                return new Duration(28);
        }
    }
}