export type ChannelStatus = "Payment Pending" | "Paid" | "Completed"
export type ScanStatus = "Not Required" | "Scan Pending" | "Scan Completed"

export const allChannelStatus: ChannelStatus[] = [
  "Payment Pending",
  "Paid",
  "Completed",
]

export const allScanStatus: ScanStatus[] = [
  "Not Required",
  "Scan Pending",
  "Scan Completed",
]