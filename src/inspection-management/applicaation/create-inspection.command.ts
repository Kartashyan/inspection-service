export class CreateInspectionCommand {
    constructor(
        public readonly clientId: string,
        public readonly siteId: string,
    ) {}
}