import { Inspector } from "../inspector/inspector.aggregate";
import { SubscriptionLevel } from "../subscription-level";

export interface InspectorRepositoryPort {
    save(inspector: Inspector): Promise<void>;
    findById(inspectorId: string): Promise<Inspector>;
    findBySubscriptionLevel(subscriptionLevel: SubscriptionLevel): Promise<Inspector[]>;
    findLeastLoadedInspector(subscriptionLevel: SubscriptionLevel): Promise<Inspector>;
}