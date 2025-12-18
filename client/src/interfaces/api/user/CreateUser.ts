import type { UserTypes } from "../../../types/User";
import type { Speciality } from "../../Speciality";

export interface CreateUserRequest {
  userName: string,
  password: string,
  name: string,
  img: string,
  userType: UserTypes,
  speciality?: Speciality,
}

// export interface CreateUserResponse extends CommonResponse {

// }