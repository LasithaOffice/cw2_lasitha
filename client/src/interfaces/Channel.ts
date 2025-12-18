import type { ChannelStatus, ScanStatus } from "../types/Channel";
import type { Patient } from "./Patient";
import type { ScanRequest } from "./ScanRequest";
import type { User } from "./User";

export interface Channel {
  _id: string,
  channelNo: string,
  patient: Patient,
  doctor: User,
  dateTime: string
  channelStatus: ChannelStatus,
  scanStatus: ScanStatus,
  scanRequest?: ScanRequest
  isActive: boolean
}