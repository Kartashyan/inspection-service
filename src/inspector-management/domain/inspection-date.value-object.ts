import { ValueObject } from "../../core-tools/value-object";

export class InspectionDate extends ValueObject<Date> {
    constructor(date: Date) {
        super(date);
    }
}