import { Inspector } from "./inspector.aggregate";
import { UID } from "../../../core-tools/id";
import { SubscriptionLevel } from "../subscription-level";
import { InspectionDate } from "../inspection-date.value-object";
import { DomainError } from "../../../core-tools/domain-error";

describe("Inspector", () => {
  let inspector: Inspector;
  const inspectorId= new UID("inspectorId");
  const subscriptionLevelsAllowed: SubscriptionLevel[] = [SubscriptionLevel.Essential, SubscriptionLevel.Advanced];
  const scheduleItem1 = {
    date: new InspectionDate(new Date("2022-01-01")),
    inspectionId: new UID("inspectionId1"),
    inspectionLevel: SubscriptionLevel.Essential,
  };
  const scheduleItem2 = {
    date: new InspectionDate(new Date("2022-01-02")),
    inspectionId: new UID("inspectionId2"),
    inspectionLevel: SubscriptionLevel.Advanced,
  };

  beforeEach(() => {
    inspector = Inspector.create({
      id: inspectorId,
      schedule: [],
      subscriptionLevelsAllowed,
    });
  });

  describe("assignInspection", () => {
    it("should assign an inspection to the schedule", () => {
      inspector.assignInspection(
        scheduleItem1.date,
        scheduleItem1.inspectionId,
        scheduleItem1.inspectionLevel
      );

      expect(inspector.props.schedule).toEqual([scheduleItem1]);
    });

    it("should throw an error if the inspector is not allowed to perform the inspection level", () => {
      expect(() =>
        inspector.assignInspection(
          scheduleItem1.date,
          scheduleItem1.inspectionId,
          SubscriptionLevel.Premium
        )
      ).toThrow(DomainError);
    });

    it("should throw an error if the inspector is already scheduled for the date", () => {
      inspector.assignInspection(
        scheduleItem1.date,
        scheduleItem1.inspectionId,
        scheduleItem1.inspectionLevel
      );

      expect(() =>
        inspector.assignInspection(
          scheduleItem1.date,
          scheduleItem2.inspectionId,
          scheduleItem2.inspectionLevel
        )
      ).toThrow(DomainError);
    });
  });
});