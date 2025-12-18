import type { Conditions, Genders } from "../types/Patient";

export interface HealthStatus {
  _id: string,
  patient: Patient,
  dateTime: string,
  diagnosis: string,
  condition: Conditions,
}

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