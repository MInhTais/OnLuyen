export interface ErrorResponse<Data> {
  message?: string
  data?: Data
}
export interface SuccessResponse<T> {
  status: number;
  data: T;
  message: string;
}