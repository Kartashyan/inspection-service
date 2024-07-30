import { AggregateRoot } from "src/core-tools/aggregate-root";
import { UID } from "src/core-tools/id";

type InspectorProps = {
    id: UID;
    schedule: {
        date: Date;
        inspectionId: UID;
    }[];
};

export class Inspector extends AggregateRoot<InspectorProps> {
    constructor(props: InspectorProps) {
        super(props);
    }
}