export class BookInspectorForInspectionCommand {
    constructor(
        public readonly inspectionId: string,
        public readonly clientId: string,
        public readonly siteId: string,
    ) {}
}