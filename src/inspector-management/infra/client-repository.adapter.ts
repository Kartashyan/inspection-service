import { UID } from "src/core-tools/id";
import { Client } from "../domain/client.aggregate";
import { ClientsRepositoryPort } from "../domain/ports/client-repository.port";
import { SubscriptionLevel } from "../domain/subscription-level";

const testClientProps = {
    id: new UID("clientId"),
    name: "Test Client",
    email: "test@test.test",
    subscriptionLevel: SubscriptionLevel.Essential,
};

const testClient = Client.create(testClientProps);

export class ClientInMemoryTestRepositoryAdapter implements ClientsRepositoryPort {
    private clients: Client[] = [testClient];

    async save(client: Client): Promise<void> {
        this.clients.push(client);
    }

    async findById(clientId: string): Promise<Client> {
        return this.clients.find(client => client.id.equals(new UID(clientId)));
    }
}