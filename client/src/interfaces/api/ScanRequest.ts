export interface CreateScanRequest {
  typeId: string,
  diseasId: string,
  channelId: string
}

export interface GetAllScanRequest {
  channelId?: string,
  isPaid?: boolean,
}