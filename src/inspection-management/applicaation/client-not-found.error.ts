export class ClientNotFoundError extends Error {
    constructor(clientId: string) {
        super(`Client with id ${clientId} not found`);
    }
}