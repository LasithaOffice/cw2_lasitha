import type { UserTypes } from "../types/User";
import type { Speciality } from "./Speciality";

export interface User {
  _id: string,
  name: string,
  img: string,
  userName: string
  userType: UserTypes
  speciality: Speciality
  isActive: boolean
}