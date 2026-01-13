export interface Pageable<T>{
    content:T[],
    number:number,
    totalPages:number,
    totalElements:number
}