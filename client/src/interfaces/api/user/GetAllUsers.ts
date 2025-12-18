import type { UserTypes } from "../../../types/User"

export interface GetAllUsersRequest {
  userType: UserTypes | "All"
}

// export interface GetAllUsersResponse extends CommonResponse {
//   list: User[]
// }