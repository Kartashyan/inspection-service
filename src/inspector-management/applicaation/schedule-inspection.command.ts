export class ScheduleInspectionCommand {
    constructor(
        public readonly inspectionId: string,
        public readonly inspectorId: string,
        public readonly inspectionDate: Date,
    ) {}
}