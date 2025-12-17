import { apiInstance } from "../config/https"
import type { CreateUserRequest, CreateUserResponse } from "../interfaces/api/auth/CreateUser"
import { type SignInResponse, type SignInRequest } from "../interfaces/api/auth/SignIn"

export const signIn = async (p: SignInRequest): Promise<SignInResponse> => {
  const data = (await apiInstance.post<SignInResponse>("auth/signin", p)).data
  return data
}

export const createUser = async (p: CreateUserRequest): Promise<CreateUserResponse> => {
  const data = (await apiInstance.post<CreateUserResponse>("auth/create", p)).data
  return data
}