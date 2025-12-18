import type { DiseaseTypes, ScanTypes } from "../types/Scan";

export interface Scan {
  _id: string,
  type: ScanTypes,
  diseas: DiseaseTypes,
  scanImages: string[],
  isCompleted: boolean,
}