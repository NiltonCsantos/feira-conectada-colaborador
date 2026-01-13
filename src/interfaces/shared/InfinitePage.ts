import { number } from "yup";

export class InfinitPage<T> {
    isLastPage: boolean = false;
    data: T[] = []

    constructor(page: number, totalPages: number, data: T[]) {
        if (page + 1 === totalPages || data.length === 0)
            this.isLastPage = true;
        this.data = data;
    }
}
