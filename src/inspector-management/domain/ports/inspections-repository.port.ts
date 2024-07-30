import { Inspection } from "../inspection.aggregate";
import { SubscriptionLevel } from "../subscription-level";

export interface InspectionsRepositoryPort {
    save(inspection: Inspection): Promise<void>;
    findById(inspectionId: string): Promise<Inspection>;
    findByInspectorId(inspectorId: string): Promise<Inspection[]>;
    findByClientId(clientId: string): Promise<Inspection[]>;
    findBySiteId(siteId: string): Promise<Inspection[]>;
    findBySubscriptionLevel(subscriptionLevel: SubscriptionLevel): Promise<Inspection[]>;
}