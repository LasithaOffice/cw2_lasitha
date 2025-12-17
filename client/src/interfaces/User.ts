import type { UserTypes } from "../types/User";

export interface User {
  name: string,
  img: string,
  userName: string
  userType: UserTypes
}