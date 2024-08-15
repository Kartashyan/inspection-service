import { UID } from "src/core-tools/id";

export class ScheduleInspectionCommand {
    constructor(
        public readonly inspectionId: UID,
    ) {}
}