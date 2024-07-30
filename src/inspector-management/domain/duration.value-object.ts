import { ValueObject } from "src/core-tools/value-object";

interface DurationProps {
    days: number;
}

export class Duration extends ValueObject<DurationProps> {
    constructor(days: number) {
        super({ days });
    }

    get days(): number {
        return this.value.days;
    }
}