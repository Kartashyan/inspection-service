export class ValueObject<T> {
    #props: T;

    constructor(props: T) {
        this.#props = props;
    }

    get value(): T {
        return Object.freeze(this.#props);
    }

    equals(vo?: ValueObject<T>): boolean {
        if (vo === null || vo === undefined) {
            return false;
        }

        return JSON.stringify(this.#props) === JSON.stringify(vo.#props);
    }
}
