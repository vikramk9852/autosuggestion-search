export interface BaseApiResponse<T> {
    statusCode: number;
    data: T;
    statusMessage: string;
}