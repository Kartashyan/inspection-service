import { Inspector } from './inspector.aggregate';
import { InspectionDate } from './inspection-date.value-object';
import { SubscriptionLevel } from './subscription-level';
import { DomainError } from '../../core-tools/domain-error';
import { UID } from '../../core-tools/id';

describe('Inspector', () => {
  let inspector: Inspector;

  beforeEach(() => {
    const props = {
      id: new UID('inspectorId'),
      schedule: [],
      subscriptionLevelsAllowed: [SubscriptionLevel.Essential, SubscriptionLevel.Advanced],
    };
    inspector = Inspector.create(props);
  });

  describe('assignInspection', () => {
    it('should assign an inspection to the inspector', () => {
      const date = new InspectionDate(new Date('2022-01-01'));
      const inspectionId = new UID('inspectionId');
      const inspectionLevel = SubscriptionLevel.Essential;

      inspector.assignInspection(date, inspectionId, inspectionLevel);

      expect(inspector.props.schedule).toEqual([
        { date, inspectionId, inspectionLevel },
      ]);
    });

    it('should throw an error if inspector is not allowed to perform the inspection level', () => {
      const date = new InspectionDate(new Date('2022-01-01'));
      const inspectionId = new UID('inspectionId');
      const inspectionLevel = SubscriptionLevel.Premium;

      expect(() =>
        inspector.assignInspection(date, inspectionId, inspectionLevel)
      ).toThrow(DomainError);
    });

    it('should throw an error if inspector is already scheduled for the date', () => {
      const date = new InspectionDate(new Date('2022-01-01'));
      const inspectionId = new UID('inspectionId');
      const inspectionLevel = SubscriptionLevel.Essential;

      inspector.assignInspection(date, inspectionId, inspectionLevel);
      expect(() =>
        inspector.assignInspection(date, inspectionId, inspectionLevel)
      ).toThrow(DomainError);
    });
  });
});