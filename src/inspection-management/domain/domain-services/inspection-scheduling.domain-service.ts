import { Inspection } from "../inspection/inspection.aggregate";
import { InspectorRepositoryPort } from "../ports/inspector-repository.port";

export class InspectionSchedulingDomainService {
    constructor(private inspectorRepository: InspectorRepositoryPort) {
        this.inspectorRepository = inspectorRepository;
    }

    async schedule(inspection: Inspection): Promise<void> {
        const inspectors = await this.inspectorRepository.findBySubscriptionLevel(inspection.getSubscriptionLevel());

        const leastBusyInspector = inspectors.reduce((prev, current) => {
            return prev.getSchedule().length < current.getSchedule().length ? prev : current;
        });

        leastBusyInspector.assignInspection(inspection.getRequestedDate(), inspection.id, inspection.getSubscriptionLevel());
        await this.inspectorRepository.save(leastBusyInspector);
    }
}