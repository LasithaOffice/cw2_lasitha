import type { ChannelStatus, ScanStatus } from "../types/Channel";
import type { Conditions } from "../types/Patient";
import type { Patient } from "./Patient";
import type { User } from "./User";

export interface Channel {
  _id: string,
  channelNo: string,
  patient: Patient,
  doctor: User,
  dateTime: string
  channelStatus: ChannelStatus,
  diagnosis: string,
  prescriptions: string,
  condition: Conditions,
  scanStatus: ScanStatus,
  isActive: boolean
}