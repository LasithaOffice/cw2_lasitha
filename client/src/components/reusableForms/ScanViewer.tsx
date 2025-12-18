import { useEffect, useState } from 'react';
import Button from '../ui/single/Button';
import Typography from '../ui/single/Typography';
import toast from 'react-hot-toast';
import { getSingleScanRequest, updateScanRequest } from '../../api/scan';
import type { ScanRequest } from '../../interfaces/ScanRequest';
import { uploadImage } from '../../api/file';
import { getError } from '../../utils/apiFunc';
import { showHideModel } from '../../utils/modelFunc';
import PatientBox from './PatientBox';
import ImageUploader from '../ui/single/ImageUploader';

type Props = {
  scanReq?: ScanRequest,
  setCTrigger: React.Dispatch<React.SetStateAction<number>>,
  setScanReq: (ch?: ScanRequest) => void
}

const ScanViewer = ({ scanReq, setScanReq, setCTrigger }: Props) => {

  const [processing, setProcessing] = useState(false)
  const [completing, setCompleting] = useState(false)
  const [file, setFile] = useState<any>()

  const [sr, setSr] = useState<ScanRequest>()

  const refreshScan = async () => {
    try {
      const reqs = await getSingleScanRequest(scanReq?._id + "")
      setSr(reqs.data)
    } catch (error) {
      toast.success(getError(error))
    }
  }

  const uploadScan_ = async () => {
    setProcessing(true);
    try {
      const f = await uploadImage({
        file
      })
      const reqs = await updateScanRequest({
        id: scanReq?._id,
        imgUrl: f.data
      })
      toast.success(reqs.message)
      await refreshScan();
      setProcessing(false);
    } catch (error) {
      toast.success(getError(error))
      setProcessing(false);
    }
  }

  const completeScanRequest = async () => {
    const e = confirm("Do you want to complete this scan request?")
    if (e) {
      setCompleting(true);
      try {
        const reqs = await updateScanRequest({
          id: scanReq?._id,
          isCompleted: true
        })
        toast.success(reqs.message)
        showHideModel("scan_viewer", false)
        setCTrigger(s => s + 1)
        setCompleting(false);
      } catch (error) {
        toast.success(getError(error))
        setCompleting(false);
      }
    }
  }

  useEffect(() => {
    if (scanReq) {
      setCompleting(false);
      setProcessing(false);
      showHideModel("scan_viewer", true)
    }
  }, [scanReq])

  return (
    scanReq &&
    <dialog id="scan_viewer" className="modal">
      <div className="modal-box w-9/12 min-w-9/12">
        <div className="w-full flex flex-col">
          <div className="flex">
            <h3 className="text-2xl mr-2">Scan Request</h3>
          </div>
          {
            <div className='mt-5'>
              <PatientBox patient={scanReq.channel.patient} />
            </div>
          }
          <div className="flex w-full">
            <div className="p-5 border mt-5 flex felx-1 flex-col w-full">
              <div className='flex mt-2'>
                <div className='flex flex-col flex-2'>
                  <Typography type='h3'>{scanReq.type.name + " - " + scanReq.diseas.name}</Typography>
                  <Typography color={scanReq.isCompleted ? 'green1' : 'error'}>{scanReq.isCompleted ? "Ready" : "Pending"}</Typography>
                </div>
                <Button text='Completed Request' mt={2} type='nutral' loading={completing} onClick={completeScanRequest} />
              </div>
              <div className='flex flex-wrap gap-2 mt-5'>
                {
                  sr ?
                    sr.scanImages.map(s =>
                      <img width={200} src={s} className='mx-1' />
                    )
                    :
                    scanReq.scanImages.map(s =>
                      <img width={200} src={s} className='mx-1' />
                    )
                }
              </div>
              <ImageUploader setFile={setFile} />
              <Button text='Upload Scan' mt={2} type='nutral' loading={processing} onClick={uploadScan_} />
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-action">
          <button className="btn" onClick={() => {
            setScanReq(undefined);
          }}>Close</button>
        </form>
      </div>
    </dialog>
  )
}

export default ScanViewer