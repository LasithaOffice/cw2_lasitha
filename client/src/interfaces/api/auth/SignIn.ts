import type { User } from "../../User"
import type { CommonResponse } from "../Common"

export interface SignInRequest {
  userName: string,
  password: string
}

export interface SignInResponse extends CommonResponse {
  user: User
}