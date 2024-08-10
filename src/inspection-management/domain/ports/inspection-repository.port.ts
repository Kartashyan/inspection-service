import { UID } from "src/core-tools/id";
import { Inspection } from "../inspection.aggregate";

export interface InspectionRepositoryPort {
    save(inspection: Inspection): Promise<void>;
    findById(inspectionId: UID): Promise<Inspection>;
    // findByInspectorId(inspectorId: string): Promise<Inspection[]>;
    // findByClientId(clientId: string): Promise<Inspection[]>;
    // findBySiteId(siteId: string): Promise<Inspection[]>;
    // findBySubscriptionLevel(subscriptionLevel: SubscriptionLevel): Promise<Inspection[]>;
}