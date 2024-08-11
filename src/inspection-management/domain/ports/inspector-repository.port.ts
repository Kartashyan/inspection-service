import { Inspector } from "../inspector.aggregate";
import { SubscriptionLevel } from "../subscription-level";

export interface InspectorRepositoryPort {
    save(inspector: Inspector): Promise<void>;
    findById(inspectorId: string): Promise<Inspector>;
    findBySubscriptionLevel(subscriptionLevel: SubscriptionLevel): Promise<Inspector[]>;
}