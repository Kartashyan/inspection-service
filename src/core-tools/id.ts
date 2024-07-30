export class UID {
    readonly value: string;
    readonly isNew: boolean;

    constructor(value?: string) {
        this.value = value || crypto.randomUUID();
        this.isNew = !value;
    }

    equals(uid?: UID): boolean {
        if (uid === null || uid === undefined) {
            return false;
        }

        return this.value === uid.value;
    }
}