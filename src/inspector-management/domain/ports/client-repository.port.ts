import { Client } from "../client.aggregate";

export interface ClientsRepositoryPort {
    save(client: Client): Promise<void>;
    findById(clientId: string): Promise<Client>;
    findByName(clientName: string): Promise<Client>;
    findByEmail(clientEmail: string): Promise<Client>;
}