import { Inspection } from "./inspection.aggregate";
import { UID } from "../../../core-tools/id";
import { SubscriptionLevel } from "../subscription-level";
import { InspectionDate } from "../inspection-date.value-object";
import { InspectionCreatedEvent } from "../domain-events/inspection-created.event";

describe("Inspection", () => {
  let inspectionId: UID;
  let requestedDate: InspectionDate;
  let subscriptionLevel: SubscriptionLevel;

  describe("create", () => {
    beforeEach(() => {
      inspectionId = new UID();
      requestedDate = new InspectionDate(new Date());
      subscriptionLevel = SubscriptionLevel.Essential;
    });
    it("should create a new Inspection instance", () => {
      const inspection = Inspection.create({
        id: inspectionId,
        inspectorId: null,
        requestedDate,
        inspectionDate: null,
        subscriptionLevel,
        isScheduled: false,
      });

      expect(inspection).toBeInstanceOf(Inspection);
      expect(inspection.props.id).toEqual(inspectionId);
      expect(inspection.props.inspectorId).toBeNull();
      expect(inspection.props.requestedDate).toEqual(requestedDate);
      expect(inspection.props.inspectionDate).toBeNull();
      expect(inspection.props.subscriptionLevel).toEqual(subscriptionLevel);
      expect(inspection.props.isScheduled).toBeFalsy();
    });

    it("should add an InspectionCreatedEvent if the inspection is new", () => {
      const inspection = Inspection.create({
        id: inspectionId,
        inspectorId: null,
        requestedDate,
        inspectionDate: null,
        subscriptionLevel,
        isScheduled: false,
      });

      const domainEvents = inspection.getDomainEvents();
      expect(domainEvents).toHaveLength(1);
      expect(domainEvents[0]).toBeInstanceOf(InspectionCreatedEvent);
      expect(domainEvents[0].props.aggregateId).toEqual(inspection.id);
    });
  });
});