export interface CommonResponse<T> {
  message: string,
  data: T,
  success: boolean
}