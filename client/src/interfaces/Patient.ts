import type { Genders } from "../types/Patient";

export interface Patient {
  _id: string,
  patientId: string,
  name: string,
  gender: Genders,
  address: string,
  tele: string,
  bDay: string,
  img: string,
  isActive: boolean
}