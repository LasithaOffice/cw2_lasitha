import { useEffect, useState } from 'react';
import Button from '../ui/single/Button';
import Typography from '../ui/single/Typography';
import toast from 'react-hot-toast';
import PatientBox from './PatientBox';
import { showHideModel } from '../../utils/modelFunc';
import type { Channel } from '../../interfaces/Channel';
import DropDown from '../ui/single/DropDown';
import { allConditions, type Conditions } from '../../types/Patient';
import TextArea from '../ui/single/TextArea';
import { updateChannel } from '../../api/channel';
import useScansAndDiseases from '../../reusableHooks/useScansAndDiseases';
import { createScanRequest, getAllScans } from '../../api/scan';
import type { ScanRequest } from '../../interfaces/ScanRequest';
import ScanImageList from '../reusableLists/ScanImageList';

type Props = {
  channel?: Channel,
  setCTrigger: React.Dispatch<React.SetStateAction<number>>,
  setChanel: (ch?: Channel) => void
}

const ChannelViewer = ({ channel, setChanel, setCTrigger }: Props) => {

  const [processing, setProcessing] = useState(false)
  const [requesting, setReqesting] = useState(false)

  const [diagnosis, setDiagnosis] = useState<string>("")
  const [condition, setCondition] = useState<Conditions>("Undetermined")
  const [prescriptions, setPrescriptions] = useState<string>("")

  const [trigger, setTrigger] = useState(0);

  const [scanType, setScanType] = useState<string>("")
  const [disease, setDisease] = useState<string>("")

  const [scanRequests, setScanRequests] = useState<ScanRequest[]>([])

  const updateConclution = async () => {
    setProcessing(true);
    const dt = await updateChannel({
      id: channel?._id + "",
      diagnosis,
      condition,
      prescriptions
    })
    toast.success(dt.message);
    setProcessing(false);
    setCTrigger(s => s + 1)
  }

  const createScanRequest_ = async () => {
    setReqesting(true);
    if (channel?.scanStatus == 'Not Required') {
      await updateChannel({
        scanStatus: 'Required',
        id: channel?._id + "",
      })
    }
    const dt = await createScanRequest({
      channelId: channel?._id + "",
      diseasId: diseases.find(d => d.name == disease)?._id + "",
      typeId: scanTypes.find(d => d.name == scanType)?._id + "",
    })
    toast.success(dt.message);
    setReqesting(false);
    setCTrigger(s => s + 1)
    setTrigger(s => s + 1)
  }

  const { diseases, scanTypes } = useScansAndDiseases();

  useEffect(() => {
    if (channel) {
      console.log("channnnn ", channel)
      setDiagnosis(channel.diagnosis)
      setCondition(channel.condition)
      setPrescriptions(channel.prescriptions)
    } else {
      setDiagnosis("")
      setCondition("Undetermined")
      setPrescriptions("")
    }
  }, [channel])

  const loadChannelScans = async () => {
    const reqs = await getAllScans({
      channelId: channel?._id
    })
    console.log("loadChannelScans", reqs)
    setScanRequests(reqs.data)
  }

  useEffect(() => {
    loadChannelScans();
  }, [channel, trigger])

  const [sr, setSr] = useState<ScanRequest>()

  useEffect(() => {
    if (sr) {
      showHideModel('scan_images_model', true)
    }
  }, [sr])

  return (
    channel &&
    <dialog id="channel_viewer" className="modal">
      <div className="modal-box w-9/12 min-w-9/12">
        <div className="w-full flex flex-col">
          <div className="flex">
            <h3 className="text-2xl mr-2">Channel No {channel.channelNo}</h3>
          </div>
          <div className="flex w-full">
            <div className="p-5 border mt-5 mr-5 flex felx-1  w-96">
              <PatientBox patient={channel.patient} />
            </div>
            <div className="p-5 border mt-5 mr-5 flex felx-1 flex-col">
              <Typography type='h2'>Doctor conclusion</Typography>
              <DropDown items={allConditions} selected={condition} title={'Current Condition'} setSelected={setCondition} mt={2} />
              <TextArea title={'Diagnosis'} mt={2} placeHolder={'Type the Diagnosis'} text={diagnosis} setText={setDiagnosis} />
              <TextArea title={'Prescriptions'} mt={2} placeHolder={'Type the Prescriptions'} text={prescriptions} setText={setPrescriptions} />
              <Button text={'Save Data'} mt={2} type='nutral' onClick={updateConclution} loading={processing} />
            </div>
            <div className="p-5 border mt-5 flex felx-1 flex-col w-90">

              <div className='mb-3'><Typography type='h2'>Scan Request</Typography></div>
              {
                scanRequests.map(s =>
                  <div className='flex mt-2'>
                    <div className='flex flex-col flex-2'>
                      <Typography type='h3'>{s.type.name + " - " + s.diseas.name}</Typography>
                      <Typography color={s.isCompleted ? 'green1' : 'error'}>{s.isCompleted ? "Ready" : "Pending"}</Typography>
                    </div>
                    <div className='ml-2' >
                      <Button text='View Scans' onClick={() => {
                        if (s.isCompleted) {
                          setSr(s)
                        } else {
                          alert("Scan is not uploaded yet!")
                        }
                      }} />
                    </div>
                  </div>
                )
              }
              <div className='p-5 rounded-2xl bg-base-200 mt-5'>
                <DropDown items={scanTypes.map(s => s.name)} selected={scanType} title={'Scan Type'} setSelected={setScanType} mt={2} />
                <DropDown items={diseases.map(s => s.name)} selected={disease} title={'Disease Type'} setSelected={setDisease} mt={2} />
                <Button text='Add Scan Request' mt={2} type='nutral' loading={requesting} onClick={createScanRequest_} />
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-action">
          <button className="btn" onClick={() => {
            setChanel(undefined);
          }}>Close</button>
        </form>
      </div>
      {
        sr &&
        <ScanImageList sr={sr} />
      }
    </dialog>
  )
}

export default ChannelViewer