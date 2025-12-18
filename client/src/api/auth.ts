import { apiInstance } from "../config/https"
import type { SignInRequest } from "../interfaces/api/auth/SignIn"
import type { CommonResponse } from "../interfaces/api/Common"
import type { User } from "../interfaces/User"

export const signIn = async (p: SignInRequest): Promise<CommonResponse<User>> => {
  const data = (await apiInstance.post<CommonResponse<User>>("auth/signin", p)).data
  return data
}