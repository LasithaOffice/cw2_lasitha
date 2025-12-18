import type { Disease } from "./Disease";
import type { ScanType } from "./ScanType";

export interface Scan {
  _id: string,
  type: ScanType,
  diseas: Disease,
  scanImages: string[],
  isCompleted: boolean,
}