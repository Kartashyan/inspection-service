import { ValueObject } from "src/core-tools/value-object";
import { Duration } from "./duration.value-object";

enum SubscriptionType {
    Essentials = 'Essential',
    Advanced = 'Advanced',
    Premium = 'Premium'
}

interface SubscriptionLevelProps {
    type: SubscriptionType;
    minDeliveryTime: Duration;
    maxDeliveryTime: Duration;
}

export class SubscriptionLevel extends ValueObject<SubscriptionLevelProps> {

    constructor(subscriptionType: SubscriptionType) {
        super({
            type: SubscriptionType[subscriptionType],
            minDeliveryTime: SubscriptionLevel.getMinDeliveryTime(subscriptionType),
            maxDeliveryTime: SubscriptionLevel.getMaxDeliveryTime(subscriptionType),
        });
    }
    static getMinDeliveryTime(subscriptionType: SubscriptionType): Duration {
        switch (subscriptionType) {
            case SubscriptionType.Essentials:
                return new Duration(28);
            case SubscriptionType.Advanced:
                return new Duration(21);
            case SubscriptionType.Premium:
                return new Duration(0);
        }
    }

    static getMaxDeliveryTime(subscriptionType: SubscriptionType): Duration {
        switch (subscriptionType) {
            case SubscriptionType.Essentials:
                return new Duration(120);
            case SubscriptionType.Advanced:
                return new Duration(60);
            case SubscriptionType.Premium:
                return new Duration(28);
        }
    }
}