import type { CommonResponse } from "./Common"

export interface UploadRequest {
  file: any
}

export interface UploadResponse extends CommonResponse {
  url: string
}