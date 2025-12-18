export type ChannelStatus = "Payment Pending" | "Paid" | "Completed"
export type ScanStatus = "Not Required" | "Required"

export const allChannelStatus: ChannelStatus[] = [
  "Payment Pending",
  "Paid",
  "Completed",
]

export const allScanStatus: ScanStatus[] = [
  "Not Required",
  "Required",
]