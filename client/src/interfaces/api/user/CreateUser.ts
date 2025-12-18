import type { UserTypes } from "../../../types/User";

export interface CreateUserRequest {
  userName: string,
  password: string,
  name: string,
  img: string,
  userType: UserTypes,
  specialityId?: string,
}

// export interface CreateUserResponse extends CommonResponse {

// }