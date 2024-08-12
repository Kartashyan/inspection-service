export class RegisterInspectionCommand {
    constructor(
        public readonly clientId: string,
        public readonly siteId: string,
    ) {}
}