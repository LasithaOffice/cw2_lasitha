import type { ChannelStatus, ScanStatus } from "../../types/Channel"
import type { Conditions } from "../../types/Patient"

export interface CreateChannelRequest {
  patientId: string,
  doctorId: string,
  dateTime: string,
  channelNo: string
}

export interface GetAllChannelRequest {
  date?: string,
  doctorId?: string,
  patientId?: string,
  channelStatus?: ChannelStatus,
  scanStatus?: ScanStatus,
}

export interface UpdateChannelRequest {
  diagnosis?: string,
  prescriptions?: string,
  condition?: Conditions,
  id: string,
  scanRequestId?: string,
  channelStatus?: ChannelStatus,
  scanStatus?: ScanStatus
}
