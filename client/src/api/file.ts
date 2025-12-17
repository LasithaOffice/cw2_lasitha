import { apiInstance } from "../config/https"
import type { UploadRequest, UploadResponse } from "../interfaces/api/Upload"

export const uploadImage = async (p: UploadRequest): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", p.file);
  const data = (await apiInstance.post<UploadResponse>("upload", formData)).data
  return data
}