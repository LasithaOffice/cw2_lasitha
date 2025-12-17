import type { UserTypes } from "../../../types/User"
import type { User } from "../../User"
import type { CommonResponse } from "../Common"

export interface GetAllUsersRequest {
  userType: UserTypes | "All"
}

export interface GetAllUsersResponse extends CommonResponse {
  list: User[]
}