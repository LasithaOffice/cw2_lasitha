import type { UserTypes } from "../../../types/User";
import type { CommonResponse } from "../Common";

export interface CreateUserRequest {
  userName: string,
  password: string,
  name: string,
  img: string,
  userType: UserTypes
}

export interface CreateUserResponse extends CommonResponse {

}