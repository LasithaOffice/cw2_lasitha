import type { Channel } from "./Channel";
import type { Disease } from "./Disease";
import type { ScanType } from "./ScanType";

export interface ScanRequest {
  _id: string,
  type: ScanType,
  diseas: Disease,
  channel: Channel,
  scanImages: string[],
  isCompleted: boolean,
  isPaid: boolean,
  isActive: boolean
}