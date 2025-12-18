import { apiInstance } from "../config/https"
import type { CommonResponse } from "../interfaces/api/Common"

export const makeChannelPayment = async (id: string): Promise<CommonResponse<any>> => {
  const data = (await apiInstance.patch<CommonResponse<any>>("payment/channel/" + id)).data
  return data
}

export const makeScanPayment = async (id: string): Promise<CommonResponse<any>> => {
  const data = (await apiInstance.patch<CommonResponse<any>>("payment/scan/" + id)).data
  return data
}
