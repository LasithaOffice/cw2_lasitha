import type { Specialities, UserTypes } from "../types/User";

export interface User {
  _id: string,
  name: string,
  img: string,
  userName: string
  userType: UserTypes
  speciality: Specialities
  isActive: boolean
}