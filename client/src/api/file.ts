import { apiInstance } from "../config/https"
import type { CommonResponse } from "../interfaces/api/Common";
import type { UploadRequest } from "../interfaces/api/Upload"

export const uploadImage = async (p: UploadRequest): Promise<CommonResponse<string>> => {
  const formData = new FormData();
  formData.append("file", p.file);
  const data = (await apiInstance.post<CommonResponse<string>>("upload", formData)).data
  return data
}