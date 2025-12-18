import type { ChannelStatus, ScanStatus } from "../../types/Channel"

export interface CreateChannelRequest {
  patientId: string,
  doctor_id: string,
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