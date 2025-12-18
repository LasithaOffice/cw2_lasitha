export interface CreateScanRequest {
  typeId: string,
  diseasId: string,
  channelId: string
}

export interface GetAllScanRequest {
  channelId?: string,
  isPaid?: boolean,
}

export interface UploadScanRequest {
  id?: string,
  imgUrl?: string,
  isCompleted?: boolean,
}