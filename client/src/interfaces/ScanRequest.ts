import type { Channel } from "./Channel";
import type { Scan } from "./Scan";

export interface ScanRequest {
  _id: string,
  channel: Channel,
  isPaid: boolean,
  scans: Scan[]
  isActive: boolean
}